const networkWhitelist = [36, 126, 127];

export function isWhitelisted(ipAddress) {
  const bits = ipAddress.split('.');
  return networkWhitelist.includes(
    parseInt(bits[1])
  );
}

export function getStoreCodeFromIpAddress(ipAddress) {
  const bits = ipAddress.split('.');
  return String(Math.floor(bits[2] / 2));
}
