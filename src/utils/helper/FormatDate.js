
export const formatDate = (date) => {
  if (!date) return "";
  const postDate = new Date(date);
  const day = String(postDate.getDate()).padStart(2, "0");
  const month = String(postDate.getMonth() + 1).padStart(2, "0");
  const year = postDate.getFullYear();

  return `${day}/${month}/${year}`;
};
