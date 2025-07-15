FROM node:24-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend source code
COPY . .

# Expose frontend port
EXPOSE 3000

# Start the React development server
CMD ["pnpm", "start"]