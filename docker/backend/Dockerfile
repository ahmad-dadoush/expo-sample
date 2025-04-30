FROM node:16-alpine
WORKDIR /app

# only copy manifests so npm install populates the node_modules volume
COPY package*.json tsconfig.json ./
RUN npm install

EXPOSE 4000
CMD ["npm", "run", "dev"]
