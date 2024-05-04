FROM node:alpine as build

WORKDIR /app

COPY . /app

RUN npm install -g @angular/cli

RUN npm install

RUN ng build --configuration=production

FROM nginx:1.25.5-alpine-slim

# Copy the built Angular app from the 'sexquest' image to the NGINX HTML directory
COPY --from=build /app/dist/sexgame /usr/share/nginx/html

# Specify the command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]