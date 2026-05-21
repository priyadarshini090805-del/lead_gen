FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/src/main.js"]