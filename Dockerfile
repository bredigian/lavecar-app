FROM node:22

WORKDIR /app

COPY package*.json /app/

RUN npm install -g pnpm && pnpm install

COPY . .

EXPOSE 3000

RUN pnpm run build

CMD ["pnpm", "run" ,"start"]