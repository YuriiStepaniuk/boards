# Base Stage
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development Stage
FROM base AS development

COPY src ./src
COPY .prettierrc ./
COPY eslint.config.mjs ./
COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

EXPOSE 3005
CMD npm run seed && npm run start:dev

# Build Stage for Production
FROM base AS build

COPY src ./src
COPY .prettierrc ./
COPY eslint.config.mjs ./
COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm run build

# Production Stage
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --production --omit=dev

EXPOSE 3005
CMD ["npm", "run", "start:prod"]
