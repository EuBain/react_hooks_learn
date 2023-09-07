FROM nginx:1.18.0-alpine
COPY ./dist /etc/nginx/html
# COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
