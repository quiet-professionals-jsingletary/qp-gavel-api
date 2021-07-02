module.exports = {
  apps: [{
    name: "gavel-api",
    script: "./server.js",
    instances: 1,
    exec_mode: "fork",
    watch: true,
    autorestart: true,
    ignore_watch: ["node_modules"],
    env_development: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}
