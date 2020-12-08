export const formatDate = (date_ob: string) => {
  const d = new Date(date_ob);
  const date = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${year}-${month}-${date}`;
};
