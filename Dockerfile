# Image source
FROM node:20-alpine

# Docker working directory
WORKDIR /usr/app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /usr/app/

# Then install the NPM module
RUN npm ci && npm cache clean --force

# Copy current directory to APP folder
COPY . /usr/app/

EXPOSE ${PORT}

VOLUME ["/usr/app"]

CMD ["npm", "run", "start:dev"]