FROM node:20-alpine3.16 as build

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

FROM node:20-alpine3.16

WORKDIR /api

COPY --from=build /build/dist ./dist
COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json .
COPY --from=build /build/LICENSE .

ENV NODE_ENV production

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "prod" ]
