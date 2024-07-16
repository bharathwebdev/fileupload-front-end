# Use the official Node.js image as the base image
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY front-end/package.json front-end/package-lock.json /

# Install app dependencies
RUN npm install

# Copy the rest of the app files
COPY front-end/ .

# Build the app
RUN npm run build

# Use the official NGINX image for serving the app
FROM nginx:1.21

# Copy the build output from the previous stage to NGINX
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY front-end/nginx.conf /etc/nginx/nginx-https.conf

# Copy SSL certificates
COPY front-end/ssl/keystore.pem /etc/nginx/ssl/
COPY front-end/ssl/key-no-passphrase.pem /etc/nginx/ssl/

# Expose ports (80 for HTTP, 443 for HTTPS)
EXPOSE 443

# Start NGINX with HTTPS
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx-https.conf"]
