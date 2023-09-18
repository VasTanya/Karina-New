const tableNav = document.getElementsByClassName("tableNav");
const table = document.getElementById("table");

const tableNavArray = Array.from(tableNav);

tableNavArray.forEach((nav) => {
  nav.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/${nav.value}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`API call ${nav.value}: `, data);

        const existingDataRows =
          document.querySelectorAll("#table tr.data-row");
        existingDataRows.forEach((row) => {
          table.removeChild(row);
        });

        const existingHeaderRow = document.querySelector(
          "#table tr.header-row"
        );
        if (existingHeaderRow) {
          table.removeChild(existingHeaderRow);
        }

        if (nav.value === "albums") {
          const headerRow = document.createElement("tr");
          headerRow.className = "header-row";
          headerRow.innerHTML = `
              <td>ID</td>
              <td>ALBUM NUMBER</td>
              <td>TITLE</td>
              `;
          // <td>IMAGE</td>

          table.appendChild(headerRow);

          data.forEach((item) => {
            const newRow = document.createElement("tr");
            newRow.className = "data-row";
            newRow.innerHTML = `
                <td>${item._id}</td>
                <td>${item.album_number}</td>
                <td>${item.title}</td>
                <td><button class="data-edit">EDIT</button></td>
                <td><button class="data-delete">DELETE</button></td>
                `;
            // <td>${item.src}</td>

            table.appendChild(newRow);

            const editButtons = newRow.querySelectorAll("button.data-edit");
            const deleteButtons = newRow.querySelectorAll("button.data-delete");

            editButtons.forEach((editButton, index) => {
              editButton.addEventListener("click", () => {
                const row = data[index];

                editButtons.forEach((button) => {
                  button.style.display = "none";
                });

                deleteButtons.forEach((button) => {
                  button.style.display = "none";
                });

                const saveButton = document.createElement("button");
                saveButton.innerText = "SAVE";
                saveButton.setAttribute("class", "data-save");
                saveButton.addEventListener("click", async () => {
                  const updatedValues = Array.from(
                    newRow.querySelectorAll("td")
                  ).map((td) => td.innerText);

                  // API REQUEST

                  editButtons.forEach((button) => {
                    button.style.display = "block";
                  });

                  deleteButtons.forEach((button) => {
                    button.style.display = "block";
                  });

                  newRow.querySelector("td:last-child").removeChild(saveButton);
                });

                newRow.querySelector("td:last-child").appendChild(saveButton);
              });
            });
          });
        } else {
          data.forEach((item) => {
            const newRow = document.createElement("tr");
            newRow.className = "data-row";
            newRow.innerHTML = `
              <td>${item._id}</td>
              <td>${item.display_number}</td>
              <td>${item.title}</td>
              <td><img class="img" src="${item.src}" /></td>
              <td><button class="data-edit">EDIT</button></td>
              <td><button class="data-delete">DELETE</button></td>
            `;

            table.appendChild(newRow);

            const editButtons = newRow.querySelectorAll("button.data-edit");
            const deleteButtons = newRow.querySelectorAll("button.data-delete");

            editButtons.forEach((editButton, index) => {
              editButton.addEventListener("click", () => {
                const row = data[index];

                editButtons.forEach((button) => {
                  button.style.display = "none";
                });

                deleteButtons.forEach((button) => {
                  button.style.display = "none";
                });

                const saveButton = document.createElement("button");
                saveButton.setAttribute("class", "data-save");
                saveButton.innerText = "SAVE";
                saveButton.addEventListener("click", async () => {
                  const updatedValues = Array.from(
                    newRow.querySelectorAll("td")
                  ).map((td) => td.innerText);

                  // API REQUEST

                  editButtons.forEach((button) => {
                    button.style.display = "block";
                  });

                  deleteButtons.forEach((button) => {
                    button.style.display = "block";
                  });

                  newRow.querySelector("td:last-child").removeChild(saveButton);
                });

                newRow.querySelector("td:last-child").appendChild(saveButton);
              });
            });

            deleteButtons.forEach((deleteButton, index) => {
              deleteButton.addEventListener("click", () => {
                const deleteModal = document.getElementById("delete-modal");
                const deleteMessage = document.getElementById("delete-message");
                const cancelDeleteButton =
                  document.getElementById("delete-cancel");
                const confirmDeleteButton =
                  document.getElementById("delete-confirm");

                deleteMessage.innerText = `Are you sure you want to delete ${data[index].title}`;

                deleteModal.style.display = "flex";

                cancelDeleteButton.addEventListener("click", () => {
                  deleteModal.style.display = "none";
                });

                confirmDeleteButton.addEventListener("click", async () => {
                  const response = await fetch("/api/item/deletefunc", {
                    method: "DELETE",
                    body: {
                      _id: data[index]._id,
                    },
                  });

                  if (response.ok) {
                    deleteMessage.innerText = `${data[index].title} has been deleted`;
                  } else {
                    deleteMessage.innerText = `Failed to delete ${data[index].title}!!! Try again later`;
                  }

                  deleteModal.style.display = "none";
                });
              });
            });
          });
        }
      } else {
        console.error("API call failed");
        const errorRow = document.createElement("tr");
        errorRow.innerHTML = `
          <td class="errorTd">Something went wrong<br>Check your connection</td>
        `;

        table.appendChild(errorRow);
      }
    } catch (error) {
      console.error("An error occurred during API call", error);
    }
  });
});
