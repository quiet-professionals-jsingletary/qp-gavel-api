
module.exports = {
  apps: [{
    name: "gavel-api",
    script: "./server.js",
    exec_mode : "cluster",
    instances : "4",
    watch: true,
    env_development: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}