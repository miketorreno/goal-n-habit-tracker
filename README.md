# Gamified Goal and Habit Tracker

## Technologies Used

Built with a modern tech stack to ensure efficiency, scalability, and an engaging user experience:

- Framework: [Next.js](https://nextjs.org/)
- Backend: [Convex](https://www.convex.dev/)
- Authentication: [Clerk](https://clerk.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI: [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/miketorreno/goal-n-habit-tracker.git

# Navigate to the project
cd goal-n-habit-tracker

# Install dependencies
npm install

# Navigate to the web app
cd apps/web

# Set up environment variables
cp .env.example .env
cp .env.local.example .env.local

# Add env variables in
.env
.env.local

# Install Convex
npm install convex
npx convex dev
# npx convex dashboard


# Open a second terminal

# Navigate to the project
cd goal-n-habit-tracker

# Start the development server
npm run dev
```

Visit `http://localhost:3000` to see the app running.

## Architecture

```text
                    ┌─────────────────────┐
                    │       docs/         │
                    │ Architecture/       │
                    │ Runbooks/           │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┴──────────────────────┐
        │                                             │
┌───────▼────────┐                            ┌───────▼────────┐
│      apps/     │                            │    packages/   │
│                │                            │                │
│ web            │                            │ UI             │
│ docs           │                            │ types          │
│ worker         │                            │ config         │
└───────┬────────┘                            └────────────────┘
        │
        │ deployed by
        ▼
┌────────────────────────────────────────────────────────────┐
│                         infra/                             │
│                                                            │
│ GitHub Actions  →   CI/CD                                  │
│ Terraform       →   Infrastructure                         │
│ Ansible         →   Server configuration                   │
│ Docker          →   Containerization                       │
│ Kubernetes      →   Orchestration                          │
│ Helm            →   Kubernetes packaging                   │
│ Nginx           →   Reverse proxy                          │
│ Scripts         →   Operational automation                 │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
               Homelab / AWS / Other Cloud
```

## Repository Structure

```text
goal-n-habit-tracker/
├── apps/
│   ├── web/
│   ├── docs/
│   └── worker/
│
├── packages/
│   ├── ui/
│   ├── config/
│   ├── types/
│   └── validation/
│
├── infra/
│   ├── terraform/
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── prod/
│   │   │
│   │   ├── modules/
│   │   │   ├── network/
│   │   │   ├── security/
│   │   │   ├── compute/
│   │   │   ├── database/
│   │   │   └── observability/
│   │   │
│   │   └── README.md
│   │
│   ├── kubernetes/
│   │   ├── base/
│   │   │   ├── namespace.yaml
│   │   │   ├── configmap.yaml
│   │   │   ├── secrets.yaml
│   │   │   └── ...
│   │   ├── overlays/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── prod/
│   │   └── README.md
│   │
│   ├── helm/
│   │   └── my-project/
│   │       ├── Chart.yaml
│   │       ├── values.yaml
│   │       ├── values-dev.yaml
│   │       ├── values-prod.yaml
│   │       └── templates/
│   │
│   ├── ansible/
│   │   ├── inventories/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── prod/
│   │   ├── playbooks/
│   │   ├── roles/
│   │   └── ansible.cfg
│   │
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.api
│   │   └── Dockerfile.worker
│   │
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── conf.d/
│   │
│   └── scripts/
│       ├── deploy.sh
│       ├── rollback.sh
│       └── health-check.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── terraform.yml
│       ├── docker.yml
│       └── deploy.yml
│
├── docs/
│   ├── architecture/
│   ├── deployment/
│   └── runbooks/
│
├── .env.example
├── .gitignore
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```
