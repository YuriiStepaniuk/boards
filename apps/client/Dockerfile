# Base Stage
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development Stage
FROM base AS development

COPY src ./src
COPY public ./public
COPY tsconfig.json ./
COPY tailwind.config.js ./
EXPOSE 3000

CMD ["npm", "run", "start"]

# Build Stage
FROM base AS build

COPY src ./src
COPY public ./public
COPY tsconfig.json ./
COPY tailwind.config.js ./

RUN npm run build

# Production Stage
FROM node:22-alpine AS production
WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package*.json ./

RUN npm install --production --omit=dev

EXPOSE 3000
CMD ["npm", "run", "build"]
