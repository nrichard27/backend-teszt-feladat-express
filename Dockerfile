FROM node:20-alpine3.16 as build

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

FROM node:20-alpine3.16

WORKDIR /api

COPY --from=build /build ./

ENV API_MONGODB_CONNECTION_STRING mongodb://localhost:27017

ENV API_WEBSITE_URL *

ENV API_ACCESS_TOKEN_SECRET asd1
ENV API_REFRESH_TOKEN_SECRET asd2

ENV API_PORT 3000

ENV NODE_ENV production

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "prod" ]
