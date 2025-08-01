export const mapModalData = (item, prevData) => {
  let data = { ...(prevData && { ...prevData }) };

  Object.keys(item).forEach((key) => {
    data[key] = item[key] || "";
  });

  return data;
};
