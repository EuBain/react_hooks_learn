FROM nginx:latest

WORKDIR /etc/nginx/html

COPY dist /etc/nginx/html
# COPY conf /etc/nginx/

