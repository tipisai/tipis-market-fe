FROM node:18-alpine AS base
RUN npm install -g pm2
RUN npm install -g pnpm@8.11.0

ARG ILLA_CLOUD_URL
ENV ILLA_CLOUD_URL=$ILLA_CLOUD_URL

ARG ILLA_BUILDER_URL
ENV ILLA_BUILDER_URL=$ILLA_BUILDER_URL

ARG ILLA_MARKET_URL
ENV ILLA_MARKET_URL=$ILLA_MARKET_URL

ARG ILLA_API_BASE_URL
ENV ILLA_API_BASE_URL=$ILLA_API_BASE_URL

ARG ILLA_APP_ENV
ENV ILLA_APP_ENV=$ILLA_APP_ENV

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=illa-market-fe


FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/app/next.config.js .
COPY --from=builder /app/app/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/app/.next/static ./app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/app/public ./app/public

EXPOSE 3000

ENV PORT 3000

# CMD pnpm turbo run start --filter=illa-market-fe
CMD node app/server.js