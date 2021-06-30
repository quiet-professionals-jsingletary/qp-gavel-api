
module.exports = {
  apps: [{
    name: "gavel-api",
    script: "./server.js",
    exec_mode : "cluster",
    instances : "4",
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}