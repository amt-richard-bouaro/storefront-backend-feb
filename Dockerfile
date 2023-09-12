FROM node:18.17.1

RUN yarn global add nodemon

WORKDIR /app

COPY package*.json ./

RUN yarn 

COPY . .

RUN yarn db:generate

EXPOSE 4455

CMD ["yarn", "run", "dev"]
# CMD [ "npx", "nodemon", "--config", "nodemon.json" ]