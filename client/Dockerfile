FROM node
WORKDIR /project
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]