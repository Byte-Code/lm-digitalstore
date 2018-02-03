const os = require('os');

export default function getHostName() {
  return os.hostname();
}
