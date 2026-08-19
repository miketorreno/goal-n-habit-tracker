import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  goals: defineTable({
    name: v.string(),
    userId: v.string(),
    parentId: v.optional(v.id("goals")),
    position: v.optional(v.number()),
    status: v.union(v.literal("todo"), v.literal("doing"), v.literal("done")),
  })
    .index("by_user", ["userId"])
    .index("by_parent", ["parentId"]),
});
