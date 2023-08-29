document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const login = document.getElementById("login");
  const password = document.getElementById("password");

  submit.onclick = async () => {
    const data = {
      login: login.value,
      password: password.value,
    };

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Login successful");
      } else {
        console.error("ERROR: ", error);
      }
    } catch (error) {
      console.error("An error occured", error);
    }
  };
});
