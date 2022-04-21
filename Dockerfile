From node:17.9.0-alpine3.15

WORKDIR /app
COPY . .
RUN npm i npm@latest
RUN  npm i
CMD [ "npm","run"."dev" ]
EXPOSE 3000