FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /user/src/app
RUN npm install
COPY . . 
EXPOSE 1412
CMD npm run start