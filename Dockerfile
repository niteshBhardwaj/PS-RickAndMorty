# base node image
FROM node:alpine

# working directory
WORKDIR /usr/app

# COPY package file
COPY ./package.json ./

# Install all dependencies
RUN npm install

# COPY ALL FILES
COPY ./ ./

# RUN BUILD 
RUN npm run build

# RUN COMMAND
CMD ["npm", "start"]