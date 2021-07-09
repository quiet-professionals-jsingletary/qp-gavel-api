FROM buildpack-deps:stretch

ENV NODE_VERSION 14.15.1

# Expose ports needed to use Keymetrics.io
EXPOSE 80 443

# Start pm2.json process file
CMD ["pm2-runtime", "ecosystem.config.js"]
