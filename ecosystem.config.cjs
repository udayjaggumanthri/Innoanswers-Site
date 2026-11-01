module.exports = {
  apps: [
    {
      name: "innoanswers-site",
      script: "server.js",
      cwd: "/home/ubuntu/Innoanswers-Site",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
