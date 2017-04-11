const networkWhitelist = [36, 126, 127];

export function isWhitelisted(ipAddress) {
  const bits = ipAddress.split('.');
  return networkWhitelist.includes(bits[1])
}

export function getStoreCodeFromIpAddress(ipAddress) {
  const bits = ipAddress.split('.');
  return Math.floor(bits[2] / 2)
}
