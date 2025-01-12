const logOutA = document.getElementById("logOut");

logOutA.addEventListener("click", async () => {
  try {
    const response = await fetch("/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
});
