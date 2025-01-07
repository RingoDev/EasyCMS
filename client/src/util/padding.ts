export const euroPad = (n: number, leftSign: boolean = false): string => {
  const euros = Math.floor(n);
  const tenthCents = Math.round((n % 1) * 10);
  const hundredthCents = Math.round(((n * 10) % 1) * 10);
  // console.log(euros,tenthCents,hundredthCents)
  if (leftSign) return "€ " + euros + "," + tenthCents + hundredthCents;
  return euros + "," + tenthCents + hundredthCents + " €";
};
