FROM node:14-stretch

LABEL maintainer="James Singletary <jsingletary@quietprofessionalsllc.com>"

ENV NODE_VERSION 14.15.1

# Install pm2
RUN npm install

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443 5000 8000 8080 43554

# Start pm2.json process file
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
