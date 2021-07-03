export function numberToMetricScale(labelValue: number) {
  const sign = Math.sign(Number(labelValue));
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? sign * Math.round(Math.abs(Number(labelValue)) / 1.0e9) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? sign * Math.round(Math.abs(Number(labelValue)) / 1.0e6) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? sign * Math.round(Math.abs(Number(labelValue)) / 1.0e3) + 'K'
    : Math.round(Math.abs(Number(labelValue)));
}
