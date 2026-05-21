FROM node:20-bullseye

WORKDIR /app

COPY . .

WORKDIR /app/apps/api

RUN npm install

RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/src/main.js"]