const queryParser = (query) => {
  try {
    const parsedQuery = {};

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== "") {
        const parsedValue = value === "*" ? "*" : JSON.parse(value);
        if (Array.isArray(parsedValue)) {
          parsedQuery[key] = parsedValue.map((item) => {
            return isNaN(item) ? item : Number(item);
          });
        } else if (!isNaN(parsedValue)) {
          parsedQuery[key] = Number(parsedValue);
        } else if (key === "size" && value === "*") {
          parsedQuery[key] = -1;
        } else {
          parsedQuery[key] = parsedValue;
        }
      }
    }

    return parsedQuery;
  } catch (error) {
    console.error("Error in queryParser:", error);
    return {};
  }
};

export default queryParser;
