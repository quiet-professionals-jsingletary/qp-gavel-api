module.exports = {
  apps: [{
    name: "gavel-api",
    script: "./server.js",
    instances: 1,
    exec_mode: "cluster",
    watch: true,
    ignore_watch: ["node_modules"],
    env_development: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}
