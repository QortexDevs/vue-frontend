FROM node:18.5.0
ARG DOMAIN_NAME=example.com
WORKDIR /app
COPY ./package.json ./
RUN yarn install && yarn cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH
ENV VUE_APP_API_BASE_URL=https://$DOMAIN_NAME
ENV VUE_APP_API_BASE_URL=https://tiger.prod.qortex.ru
ENV VITE_APP_API_BASE_URL=https://tiger.prod.qortex.ru
ENV VITE_JSON_API_BASE_URL=https://tiger.prod.qortex.ru/
ENV VITE_API_KEY=k9M3ghBpyFU8DszpfnsrVz3ASTsRESYP
# Will be overwritten with the contents of src folder when running via docker-compose-dev.yml
WORKDIR /app/src
COPY . .
RUN yarn build
CMD [ "yarn", "dev" ]
