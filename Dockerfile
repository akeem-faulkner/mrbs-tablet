FROM node:0.12.0

ADD app /src

RUN cd /src  && npm install express-generator -g && npm install && npm install sqlite3 --build-from-source

WORKDIR /src

EXPOSE 80

CMD ./node_modules/.bin/nodemon ./bin/www