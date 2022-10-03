# Step 1
FROM node:16.17.1 AS builder

WORKDIR /app/scratchnow

COPY . .

RUN npm install
RUN npm run build
RUN npm run api-docs


# Step 2
FROM node:16.17.1-alpine

WORKDIR /app/scratchnow

RUN npm install -g pm2

COPY --from=builder /app/scratchnow ./