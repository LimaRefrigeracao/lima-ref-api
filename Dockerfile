FROM node:lts-alpine

RUN apk add --no-cache bash

RUN touch /home/node/.bashrc | echo "PS1='\w\$'" >> /home/node/.bashrc

USER node

WORKDIR /home/node/app