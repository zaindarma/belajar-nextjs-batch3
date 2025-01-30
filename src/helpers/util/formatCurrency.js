// Buat fungsi reusable untuk format mata uang

export const formatCurrency = (price, locale = "en-AU", currency = "AUD") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(price);
};
