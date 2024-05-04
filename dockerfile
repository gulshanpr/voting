FROM node:22

WORKDIR /src/app

COPY . .

RUN npm install
RUN npm run dev

EXPOSE 3000

CMD ["node", "src/app/page.js"]

