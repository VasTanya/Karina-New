const logOutA = document.getElementById("logOut");

logOutA.addEventListener("click", async () => {
  try {
    const response = await fetch("api.karinas515.com/api/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/admin/login";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
});
