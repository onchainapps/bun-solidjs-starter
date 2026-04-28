module.exports = {
  apps: [{
    name: 'bun-solidjs-starter',
    script: 'src/server.ts',
    interpreter: 'bun',
    cwd: __dirname,
    autorestart: true,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: '3030',
      HOST: '0.0.0.0'
    },
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    time: true
  }]
};
