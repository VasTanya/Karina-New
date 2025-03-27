export const defineUserStatus = (status) => {
  if (status === "idle") {
    return false;
  } else if (status === "loading") {
    return false;
  } else if (status === "error") {
    return false;
  } else if (status === "successful") {
    return true;
  }
};
