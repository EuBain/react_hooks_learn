FROM nginx:latest
COPY ./dist /etc/nginx/html
# COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
