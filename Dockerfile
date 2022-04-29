From node:17.9.0-alpine3.15

WORKDIR /app
COPY ./package*.json ./
RUN  npm i
COPY . .
CMD [ "npm","run","dev" ]
EXPOSE 3000