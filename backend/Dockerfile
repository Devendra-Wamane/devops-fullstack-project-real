FROM node:18-alpine

WORKDIR /usr/src/app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# copy source
COPY src ./src

EXPOSE 3000

CMD ["node", "src/app.js"]
