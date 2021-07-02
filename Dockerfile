FROM debian:stretch-slim

LABEL maintainer="James Singletary <jsingletary@quietprofessionalsllc.com>"

ENV NODE_VERSION 14.15.1

# Install pm2
RUN npm install pm2

# Expose ports needed to use Keymetrics.io
EXPOSE 80 8000 8001 8080 8181

# Start pm2.json process file
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
