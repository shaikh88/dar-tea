const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export function formatMoney(rupees: number): string {
  return formatter.format(rupees);
}
