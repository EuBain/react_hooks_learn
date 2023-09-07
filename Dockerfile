FROM nginx:1.18.0
COPY dist /etc/nginx/html
# COPY conf /etc/nginx/
WORKDIR /etc/nginx/html
