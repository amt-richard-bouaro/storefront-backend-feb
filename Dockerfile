FROM node:17-alpine

RUN yarn global add nodemon

WORKDIR /app

COPY package*.json ./

RUN yarn 

COPY . .

EXPOSE 4455

CMD ["yarn", "run", "dev"]
# CMD [ "npx", "nodemon", "--config", "nodemon.json" ]