FROM node:10.16.3 as builder
ENV LAST_UPDATED 20191017T160000

#PM2 is the process manager
# RUN npm install -g pm2@latest

RUN mkdir /app && mkdir /app/client && mkdir /app/server

# Prevent unneeded installs
COPY client/package*.json ./
COPY server/package*.json ./

# Copy all
COPY . /app

# Change working directory
WORKDIR /app/client

# # Install dependencies
RUN npm install
RUN npm run build-docker

# COPY dist/* .

# RUN cd ../server && npm install

FROM nginx:latest

## Remove default nginx website/config
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/nginx.conf

# Copy artifacts to nginx
COPY --from=builder /app/client/dist/partner /usr/share/nginx/html/partner
COPY --from=builder /app/client/static /usr/share/nginx/html/static

# Nginx config
COPY --from=builder /app/.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/.nginx/proxy.conf /etc/nginx/proxy.conf
COPY --from=builder /app/.nginx/partner.site /etc/nginx/conf.d/partner.site

# Expose API port to the outside
EXPOSE 3000

# Expose angular app port to the outside
EXPOSE 8080

# Check nginx config
RUN nginx -t;

# Launch nginx (serves site)
CMD ["nginx", "-g", "daemon off;"]