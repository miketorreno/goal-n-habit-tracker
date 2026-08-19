# Gamified Goal and Habit Tracker

### Architecture

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

### Repository Structure

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
