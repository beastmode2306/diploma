FROM node:18 as build
WORKDIR /usr/src/app-consumer
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app-consumer
COPY --chown=node:node --from=build /usr/src/app-consumer/dist ./dist
COPY --chown=node:node --from=build /usr/src/app-consumer/.env .env
COPY --chown=node:node --from=build /usr/src/app-consumer/package.json .
COPY --chown=node:node --from=build /usr/src/app-consumer/package-lock.json .
RUN npm install --omit=dev

ENV NODE_ENV production
EXPOSE 8001
CMD ["dumb-init", "node", "dist/main"]