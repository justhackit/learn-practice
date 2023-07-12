#docker buildx build --push --platform linux/arm64  -t ajayedap/playground:awsomeui .
#To Run on local: docker run -p 8090:8090  ajayedap/playground:awsomeui
FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy dependency management files
COPY package.json *lock.json ./ 
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install
# Copy app files
COPY . .
RUN npm run build
# open the port where react service starts
#EXPOSE 3000
#Command to start the service
#CMD ["npm", "start"]

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html/
# Add your nginx.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 8090
# Start nginx
CMD ["nginx", "-g", "daemon off;"]