FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 5555
CMD ["npm", "start"]
