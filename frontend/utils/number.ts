export const truncateAddress = (address?: string) => {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
export const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions
) => new Intl.NumberFormat("en-US", options).format(value);
