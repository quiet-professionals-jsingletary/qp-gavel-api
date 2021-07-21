module.exports = {
  name: "gavel-app",
  script: "serve",
  instances: 4,
  exec_mode: "cluster",
  watch: true,
  // ignore_watch: ["node_modules"],
  args: "--no-daemon --spa",
  interpreter: "node",
  interpreter_args: "--max-old-space-size=4096",
  env_production: {
    NODE_ENV: "production",
    PUBLIC_URL: "https://qp-gavel-mvp.azurewebsites.net",
    PM2_SERVE_PORT: 8080, 
  },
  env_development: {
    NODE_ENV: "development",
    PUBLIC_URL: "http://localhost:5000",
    PM2_SERVE_PORT: 5000,
    PM2_SERVE_INCREMENT_VAR: "PORT"
  }

}
