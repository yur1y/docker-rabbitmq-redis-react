FROM node:24-alpine

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --chown=nodejs:nodejs . .

USER nodejs

ENV NODE_ENV=production
EXPOSE 3001

CMD ["pnpm", "start:prod"]