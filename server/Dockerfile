FROM node:latest
WORKDIR /project
COPY package.json .
COPY package-lock.json .
COPY . .

RUN mkdir /scripts
COPY *.sql /scripts/

RUN npm install

COPY script.sh /
RUN chmod +x /script.sh
# ENTRYPOINT ["/script.sh"]

EXPOSE 8080