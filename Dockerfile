# Image source
FROM node:20-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./package-lock.json /app/

# Then install the NPM module
RUN npm ci && npm cache clean --force

# Copy current directory to APP folder
COPY . /app/

EXPOSE ${PORT}

VOLUME ["/app"]

CMD ["npm", "run", "start:dev"]