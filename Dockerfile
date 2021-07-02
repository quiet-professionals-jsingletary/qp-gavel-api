FROM node:15-stretch
LABEL maintainer="Keymetrics <contact@keymetrics.io>"

# Install pm2
RUN npm install pm2 -g

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 8000 8080 43554

# Start pm2.json process file
CMD ["pm2-runtime", "start", "ecosystem.config.js"]