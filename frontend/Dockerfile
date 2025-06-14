FROM node:lts-alpine AS development
COPY . /app
WORKDIR /app
RUN yarn install --network-timeout 1000000000

CMD ["yarn", "dev"]

FROM node:lts-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN yarn install --network-timeout 1000000000

FROM node:lts-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN yarn install --network-timeout 1000000000 --omit=dev

FROM node:lts-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn run build

FROM node:lts-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]