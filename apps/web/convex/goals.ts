import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * @param {Id<"goals">} [parentId] - Optional parent ID to filter goals
 * @throws {Error} If user is not authenticated
 * @returns {Promise<Goal[]>} List of goals owned by the user, ordered by position
 */
export const list = query({
  args: {
    parentId: v.optional(v.id("goals")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    let q = ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("userId"), identity.subject));

    if (args.parentId) {
      q = q.filter((q) => q.eq(q.field("parentId"), args.parentId));
    }

    const goals = await q.collect();
    return goals.sort(
      (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity),
    );
  },
});

/**
 * @param {Id<"goals">} id - Goal ID to retrieve
 * @throws {Error} If user is not authenticated or goal not found/owned by user
 * @returns {Promise<Goal>} The requested goal
 */
export const get = query({
  args: { id: v.id("goals") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const goal = await ctx.db.get(args.id);
    if (!goal || goal.userId !== identity.subject) {
      throw new Error("Goal not found");
    }
    return goal;
  },
});

/**
 * @param {string} name - Display name for the goal
 * @param {Id<"goals">} parentId - Optional parent ID to grounp in
 * @throws {Error} If user is not authenticated or goal not found/owned by user
 * @returns {Promise<Id<"goals">>} ID of the newly created goal
 */
export const create = mutation({
  args: {
    name: v.string(),
    parentId: v.optional(v.id("goals")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Verify goal belongs to user
    if (args.parentId !== undefined) {
      const parent = await ctx.db.get(args.parentId);
      if (!parent || parent.userId !== identity.subject) {
        throw new Error("Goal not found");
      }
    }

    // Position is determined by the max existing position + 1 among the parent goal's goals
    const existingParents = await ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("parentId"), args.parentId))
      .collect();

    const maxPosition = existingParents.reduce(
      (max, goal) => Math.max(max, goal.position || 0),
      0,
    );

    return await ctx.db.insert("goals", {
      name: args.name,
      userId: identity.subject,
      parentId: args.parentId,
      position: maxPosition + 1,
      status: "todo",
    });
  },
});

/**
 * Position update logic:
 * - Moving down: Decrement positions of goals between old and new position
 * - Moving up: Increment positions of goals between new and old position
 *
 * @param {Id<"goals">} id - Goal ID to update
 * @param {string} name - New goal name
 * @param {number} position - New position in the list
 * @throws {Error} If user is not authenticated or goal not found/owned by user
 */
export const update = mutation({
  args: {
    id: v.id("goals"),
    name: v.string(),
    position: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const goal = await ctx.db.get(args.id);
    if (!goal || goal.userId !== identity.subject) {
      throw new Error("Not authorized");
    }

    const allGoals = await ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("parentId"), goal.parentId))
      .collect();

    // Handle position updates if position changed
    if (goal.position !== args.position) {
      const oldPosition = goal.position ?? allGoals.length;
      const newPosition = args.position;

      for (const otherGoal of allGoals) {
        if (otherGoal._id === args.id) continue;

        const currentPosition = otherGoal.position ?? allGoals.length;
        if (oldPosition < newPosition) {
          // Moving down: shift affected goals up
          if (currentPosition > oldPosition && currentPosition <= newPosition) {
            await ctx.db.patch(otherGoal._id, {
              position: currentPosition - 1,
            });
          }
        } else {
          // Moving up: shift affected goals down
          if (currentPosition >= newPosition && currentPosition < oldPosition) {
            await ctx.db.patch(otherGoal._id, {
              position: currentPosition + 1,
            });
          }
        }
      }
    }

    // Update the goal's properties
    await ctx.db.patch(args.id, {
      name: args.name,
      position: args.position,
    });
  },
});

/**
 * Performs cascading deletion in this order:
 * 1. Deletes the goal and its subtree (goals -> another goals -> and another goals)
 * 2. Updates positions of remaining goals to maintain order within the goal
 *
 * @param {Id<"goals">} id - ID of goal to delete
 * @throws {Error} If user is not authenticated or goal not found/owned by user
 */
export const remove = mutation({
  args: {
    id: v.id("goals"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const goal = await ctx.db.get(args.id);
    if (!goal || goal.userId !== identity.subject) {
      throw new Error("Goal not found");
    }

    // TODO Step 1: Delete the goal and its subtree (handled by deleteLimbSubtree)
    // await deleteSubgoal(ctx, args.id);

    // TODO Step 2: Update positions of remaining goals within the same goal
    // const allGoals = await ctx.db
    //   .query("goals")
    //   .filter((q) => q.eq(q.field("parentId"), goal.parentId))
    //   .collect();

    // const deletedPosition = goal.position ?? allGoals.length + 1;

    // Decrement position of all goals that were after the deleted one
    // for (const otherGoal of allGoals) {
    //   if (otherGoal._id === args.id) continue;

    //   const currentPosition = otherGoal.position ?? allGoals.length + 1;
    //   if (currentPosition > deletedPosition) {
    //     await ctx.db.patch(otherGoal._id, {
    //       position: currentPosition - 1,
    //     });
    //   }
    // }
    await ctx.db.delete(args.id);
  },
});
