#Buildinf layer
FROM node:16-alpine as development

WORKDIR /app


COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli*.json ./

RUN npm ci --force

COPY src/ src/

RUN npm run build


#Runtime (production) Layer

FROM node:16-alpine as production

WORKDIR /app


#Copy  dependecies files
COPY package*.json ./

#Install runtime dependecies (without dev/test dependecies)
RUN npm i --omit=dev --force

#Copy production build 
COPY --from=development /app/dist/ ./dist/

# Expose application port 
EXPOSE 3002

#Start application
CMD [ "node", "dist/main.js" ]