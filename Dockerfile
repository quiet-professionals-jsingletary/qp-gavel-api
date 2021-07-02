FROM node:15-stretch
LABEL maintainer="Keymetrics <contact@keymetrics.io>"

# Install pm2
RUN npm install

# Expose ports needed to use Keymetrics.io
EXPOSE 80 8000 8001 8080

# Start pm2.json process file
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
