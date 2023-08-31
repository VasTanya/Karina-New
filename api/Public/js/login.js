document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  submit.onclick = async (e) => {
    e.preventDefault();

    const data = {
      email: email.value,
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
        window.location.href = "/products";
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
});
