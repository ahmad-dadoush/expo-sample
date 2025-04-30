FROM node:18-alpine

WORKDIR /app

RUN corepack enable && corepack prepare yarn@1.22.19 --activate

RUN yarn install

EXPOSE 19000 19001 19002 19006

CMD ["npx", "expo", "start", "--web"]