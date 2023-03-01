FROM node:18.2.0 AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run build


FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build /usr/share/nginx/html