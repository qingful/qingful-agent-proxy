FROM node:9.11.1
COPY . /www
WORKDIR /www
RUN yarn global add pm2 && yarn
EXPOSE 3000
CMD pm2-runtime start pm2.json