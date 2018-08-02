FROM node:8
WORKDIR /usr/src/app
# VOLUME 
COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install

COPY . .
EXPOSE 3000
CMD ["npm","start"]