export const DAY_MS = 60 * 60 * 24 * 1000;

export const getDateParsed = (date: Date) => {
  return date.toISOString().split('T')[0];
};

export const getTomorrow = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return getDateParsed(today);
}

const getDateMs = (date: string) => {
  return new Date(date).getTime();
};

export const getDaysBetween = (date1: string, date2: string) => {
  const d1 = getDateMs(date1);
  const d2 = getDateMs(date2);
  return Math.round(Math.abs((d2 - d1) / DAY_MS));
};

export const getDateSumDays = (date: string, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return getDateParsed(d);
};
