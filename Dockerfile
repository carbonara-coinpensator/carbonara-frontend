FROM node:8 as builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source & build scripts
ENV NODE_ENV=production
COPY webpack* ./
COPY .babelrc ./
COPY ./src ./src

# Build
RUN npx webpack --config webpack.config.js --mode production --progress --output-path /usr/src/app/build

# Basic nginx container
FROM nginx

# Copy built static assets
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
