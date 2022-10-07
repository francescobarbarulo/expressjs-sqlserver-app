FROM node:18-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=8080

USER node

ENTRYPOINT ["npm", "run", "start"]