FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN ls
RUN npm install
RUN npm run build

EXPOSE 5555
RUN npm run start

