export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
}
export function formatNumber(n?: number): string {
  if (n === undefined || n === null) return "";
  return new Intl.NumberFormat("en-US").format(n);
}
