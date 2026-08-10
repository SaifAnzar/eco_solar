<!-- BEGIN: staging-vps-rules -->
# Pragati EcoSolar — Staging VPS Deployment Guidelines & Rules

All deployment automation, Prisma CLI commands, and server maintenance tasks MUST strictly adhere to the following VPS staging parameters:

## 1. Environment & Path Specifications
- **Server Path:** `/var/www/pragati-ecosolar-staging`
- **Git Branch:** `develop`
- **Staging Database:** `pragati_ecosolar_staging` (PostgreSQL)
- **DB User:** `solar_user`

## 2. Prisma CLI Version Pinning
- **MANDATORY**: Always force-pin Prisma CLI commands to version `5.22.0` (`npx prisma@5.22.0`).
- **Commands**:
  - `npx prisma@5.22.0 generate`
  - `npx prisma@5.22.0 db push`
  - `npx prisma@5.22.0 studio --port 5555 --hostname 0.0.0.0`

## 3. Network Ports & PM2 Architecture
- **PM2 Process Name:** `pragati-ecosolar-staging`
- **Internal Application Port:** `3002` (`pm2 start npm --name "pragati-ecosolar-staging" -- start -- -p 3002`)
- **Nginx Public Port:** `3001` (Reverse proxy `http://200.141.15.203:3001` -> `http://127.0.0.1:3002`)
- **Prisma Studio Public Port:** `5555` (`http://200.141.15.203:5555`)

## 4. Standard Staging Deployment Workflow
When pushing updates to VPS (`/var/www/pragati-ecosolar-staging`):
1. `git pull origin develop`
2. `npx prisma@5.22.0 generate`
3. `npx prisma@5.22.0 db push` (if schema changes exist)
4. `npm run build`
5. `pm2 restart pragati-ecosolar-staging`
<!-- END: staging-vps-rules -->
