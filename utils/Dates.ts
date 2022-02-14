export const formatDateWithLocale = (date: Date, locale = "en-US") =>
  new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    day: "numeric",
  }).format(date);
