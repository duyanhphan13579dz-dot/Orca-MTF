#!/usr/bin/env node
/**
 * Orca-MTF Dev Server Entry
 * Ensures host 0.0.0.0 and port 3000 compatibility with AI Studio supervisor.
 */
const { spawn } = require('child_process');
const path = require('path');

let port = '3000';
let host = '0.0.0.0';

const rawArgs = process.argv.slice(2);
for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--port' || arg === '-p') {
    port = rawArgs[++i] || port;
  } else if (arg.startsWith('--port=')) {
    port = arg.split('=')[1] || port;
  } else if (arg === '--host' || arg === '-H' || arg === '--hostname') {
    host = rawArgs[++i] || host;
  } else if (arg.startsWith('--host=')) {
    host = arg.split('=')[1] || host;
  }
}

const nextBin = path.join(__dirname, '..', 'node_modules', '.bin', 'next');
const child = spawn(nextBin, ['dev', '-p', port, '-H', host], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: port, HOST: host }
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code || 0);
});
