FROM node:14

WORKDIR /usr/app
COPY package.json .

WORKDIR /usr/app
RUN yarn
COPY . .
RUN yarn build

EXPOSE 4000

WORKDIR /usr/app/dist
ENV NODE_ENV "production"
CMD yarn typeorm migration:run -t false && yarn start
