#docker build -t docker-repo.lowecloud.com/mrbs-tablet:0.2 . && docker push docker-repo.lowecloud.com/mrbs-tablet:0.2
FROM node:0.12.0

ADD app /src

RUN cd /src  && npm install express-generator -g && npm install

WORKDIR /src

EXPOSE 80

CMD ./node_modules/.bin/nodemon ./bin/www