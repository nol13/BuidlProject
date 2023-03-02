export function shortAddress(address) {
  const shortAddress =
    address.substr(0, 4) + "..." + address.substr(address.length - 4);
  return shortAddress;
}
