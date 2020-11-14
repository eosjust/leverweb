FROM nginx:stable

# copy the custom website into the image
COPY ./dist/ /usr/share/nginx/html/

# copy the SSL configuration file into the image
COPY ssl.conf /etc/nginx/conf.d/ssl.conf

# download the SSL key and certificate into the image
COPY nginx.key /etc/nginx/ssl/nginx.key
COPY nginx.pem /etc/nginx/ssl/nginx.pem

# expose the https port
EXPOSE 443
EXPOSE 80

# Start Nginx and keep it running background and start php
CMD sed -i "s/ContainerID: /ContainerID: "$(hostname)"/g" /usr/share/nginx/html/index.html && nginx -g "daemon off;"