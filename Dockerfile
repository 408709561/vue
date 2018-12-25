FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["sh","/usr/local/bin/docker-entrypoint.sh"]
