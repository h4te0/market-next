export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) => {
  return new Date(date).toLocaleDateString('ru-RU', options);
};
