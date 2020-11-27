const oldNetworkWhitelist = [36, 126, 127];
const newNetworkWhitelist = [132];
const networkWhitelist = [...oldNetworkWhitelist, ...newNetworkWhitelist];

export function isWhitelisted(ipAddress) {
  const bits = ipAddress.split(".");
  return networkWhitelist.includes(parseInt(bits[1]));
}

export function getStoreCodeFromIpAddress(ipAddress) {
  const bits = ipAddress.split(".");
  return String(
    oldNetworkWhitelist.includes(bits[1])
      ? Math.floor(bits[2] / 2)
      : Math.floor(bits[2] / 4) + 1
  );
}
