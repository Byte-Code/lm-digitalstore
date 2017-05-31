const os = require('os');

export default function getIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  /* eslint-disable */
  for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
      const address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  /* eslint-disable */

  return addresses;
}
