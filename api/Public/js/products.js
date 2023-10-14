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
              <td>BUTTONS</td>
              `;

          table.appendChild(headerRow);

          data.forEach((item) => {
            const newRow = document.createElement("tr");
            newRow.className = "data-row";
            newRow.innerHTML = `
                <td class="edit-album">${item._id}</td>
                <td class="edit-album">${item.album_number}</td>
                <td class="edit-album">${item.title}</td>
                <td><button class="data-edit">EDIT</button></td>
                <td><button class="data-delete">DELETE</button></td>
                <td><button class="data-view">VIEW</button></td>
                `;

            table.appendChild(newRow);

            const editButtons = newRow.querySelectorAll("button.data-edit");
            const deleteButtons = newRow.querySelectorAll("button.data-delete");
            const viewButtons = newRow.querySelectorAll("button.data-view");

            editButtons.forEach((editButton, index) => {
              editButton.addEventListener("click", () => {
                editButton.style.display = "none";
                deleteButtons[index].style.display = "none";
                viewButtons[index].style.display = "none";

                const idTd = newRow.querySelector("td:nth-child(1)");
                const albumNumberTd = newRow.querySelector("td:nth-child(2)");
                const titleTd = newRow.querySelector("td:nth-child(3)");

                const ogAlbumNumber = albumNumberTd.textContent;
                const ogTitle = titleTd.textContent;

                const albumNumberInput = document.createElement("input");
                albumNumberInput.value = albumNumberTd.textContent;

                const titleInput = document.createElement("input");
                titleInput.value = titleTd.textContent;

                albumNumberTd.innerHTML = "";
                albumNumberTd.appendChild(albumNumberInput);

                titleTd.innerHTML = "";
                titleTd.appendChild(titleInput);

                const sendEditButton = document.createElement("button");
                sendEditButton.setAttribute("class", "edit-save");
                sendEditButton.textContent = "SAVE";

                const cancelEditButton = document.createElement("button");
                cancelEditButton.setAttribute("class", "edit-cancel");
                cancelEditButton.textContent = "CANCEL";

                sendEditButton.addEventListener("click", async () => {
                  try {
                    const editData = {
                      _id: idTd.textContent,
                      album_number: albumNumberInput.value,
                      title: titleInput.value,
                    };

                    const fetchEdit = await fetch(
                      `/api/${nav.value}/${idTd.textContent}/edit`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(editData),
                      }
                    );

                    location.reload();
                  } catch (error) {
                    console.error("Error during editing:", error);
                  }
                });

                cancelEditButton.addEventListener("click", () => {
                  albumNumberTd.innerHTML = ogAlbumNumber;
                  titleTd.innerHTML = ogTitle;

                  sendEditButton.remove();
                  cancelEditButton.remove();

                  editButton.style.display = "block";
                  deleteButtons[index].style.display = "block";
                  viewButtons[index].style.display = "block";
                });

                newRow.lastElementChild.previousElementSibling.appendChild(
                  sendEditButton
                );
                newRow.lastElementChild.appendChild(cancelEditButton);
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
                  try {
                    const response = await fetch(`/api/${nav.value}/delete`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        _id: data[index]._id,
                      }),
                    });

                    if (response.ok) {
                      deleteMessage.innerText = `${data[index].title} has been deleted`;
                    } else if (response.status === 404) {
                      deleteMessage.innerText = `Resource not found`;
                    } else {
                      deleteMessage.innerText = `Failed to delete ${data[index].title}!!! Try again later`;
                    }

                    deleteModal.style.display = "none";
                  } catch (error) {
                    console.error("Error during delete:", error);
                    deleteMessage.innerText = `An error occurred during deletion`;
                  }
                });
              });
            });

            viewButtons.forEach((viewButton, index) => {
              viewButton.addEventListener("click", async () => {
                const albumId =
                  newRow.querySelector("td:nth-child(1)").textContent;

                try {
                  const response = await fetch(
                    `/api/${nav.value}/${albumId}?page=1&size=all`
                  );

                  if (!response.ok) {
                    throw new Error("Error");
                  }

                  const { data } = await response.json();

                  table.innerHTML = "";

                  const headerRow = document.createElement("tr");
                  headerRow.className = "header-row";
                  headerRow.innerHTML = `
                    <td>ID</td>
                    <td>DISPLAY NUMBER</td>
                    <td>IMAGE</td>
                    <td>BUTTONS</td>
                  `;

                  table.appendChild(headerRow);

                  data.forEach((item) => {
                    const newRow = document.createElement("tr");
                    newRow.className = "data-row";
                    newRow.innerHTML = `
                      <td class="edit-album">${item._id}</td>
                      <td class="edit-album">${item.display_number}</td>
                      <td><img class="img" src="${item.src}" /></td>
                      <td><button class="data-edit">EDIT</button></td>
                      <td><button class="data-delete">DELETE</button></td>
                    `;

                    console.log("item.src", item.src);

                    table.appendChild(newRow);

                    const editButtons =
                      newRow.querySelectorAll("button.data-edit");
                    const deleteButtons =
                      newRow.querySelectorAll("button.data-delete");

                    editButtons.forEach((editButton, index) => {
                      editButton.addEventListener("click", () => {
                        const editModal = document.getElementById("edit-modal");
                        const editModalInputs = document.querySelectorAll(
                          ".edit-modal-textInput"
                        );

                        const id = newRow.querySelector("td:nth-child(1)");
                        const displayNumber =
                          newRow.querySelector("td:nth-child(2)");
                        const imgSrc = newRow.querySelector(
                          "td:nth-child(3) img"
                        ).src;
                        const title = newRow.querySelector("td:nth-child(4)");

                        editModalInputs[0].value = id.textContent;
                        editModalInputs[1].value = displayNumber.textContent;
                        editModalInputs[2].style.display = title
                          ? "none"
                          : "block";
                        editModalInputs[3].src = imgSrc;

                        editModalInputs[4].addEventListener("change", (e) => {
                          const selectedFile = e.target.files[0];

                          if (selectedFile) {
                            editModalInputs[3].src =
                              URL.createObjectURL(selectedFile);
                          } else {
                            editModalInputs[3].src = item.src;
                          }
                        });

                        const editModalForm =
                          document.getElementById("edit-modal-form");
                        const cancelEditButton =
                          document.getElementById("edit-cancel");

                        editModalForm.addEventListener("submit", async (e) => {
                          e.preventDefault();

                          const formData = new FormData();

                          formData.append(
                            "displayNumber",
                            editModalInputs[1].value
                          );
                          formData.append("src", item.src);
                          formData.append("img", editModalInputs[4].files[0]);

                          try {
                            const fetchEdit = await fetch(
                              `/api/${nav.value}/${albumId}/${editModalInputs[0].value}/edit`,
                              {
                                method: "PUT",
                                body: formData,
                              }
                            );

                            if (response.ok) {
                              window.location.reload();
                            } else {
                              console.error("Edit failed");
                            }
                          } catch (error) {
                            console.error("Error during editing:", error);
                          }
                        });

                        cancelEditButton.addEventListener("click", () => {
                          editModal.style.display = "none";
                        });

                        editModal.style.display = "flex";
                      });
                    });

                    deleteButtons.forEach((deleteButton, index) => {
                      deleteButton.addEventListener("click", () => {
                        console.log(data[index]);
                        const deleteModal =
                          document.getElementById("delete-modal");
                        const deleteMessage =
                          document.getElementById("delete-message");
                        const cancelDeleteButton =
                          document.getElementById("delete-cancel");
                        const confirmDeleteButton =
                          document.getElementById("delete-confirm");

                        deleteMessage.innerText = `Are you sure you want to delete ${data[index].display_number}`;

                        deleteModal.style.display = "flex";

                        cancelDeleteButton.addEventListener("click", () => {
                          deleteModal.style.display = "none";
                        });

                        confirmDeleteButton.addEventListener(
                          "click",
                          async () => {
                            try {
                              const response = await fetch(
                                `/api/${nav.value}/${albumId}/${data[index]._id}/delete`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                }
                              );

                              if (response.ok) {
                                deleteMessage.innerText = `${data[index].display_number} has been deleted`;
                              } else if (response.status === 404) {
                                deleteMessage.innerText = `Resource not found`;
                              } else {
                                deleteMessage.innerText = `Failed to delete ${data[index].display_number}!!! Try again later`;
                              }

                              deleteModal.style.display = "none";
                            } catch (error) {
                              console.error("Error during delete:", error);
                              deleteMessage.innerText = `An error occurred during deletion`;
                            }
                          }
                        );
                      });
                    });
                  });
                } catch (error) {
                  console.error("Error during view: ", error.message);
                }
              });
            });
          });
        } else {
          const headerRow = document.createElement("tr");
          headerRow.className = "header-row";
          headerRow.innerHTML = `
              <td>ID</td>
              <td>DISPLAY NUMBER</td>
              <td>TITLE</td>
              <td>IMAGE</td>
              <td>BUTTONS</td>
              `;

          table.appendChild(headerRow);

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
                const editModal = document.getElementById("edit-modal");
                const editModalInputs = document.querySelectorAll(
                  ".edit-modal-textInput"
                );

                const id = newRow.querySelector("td:nth-child(1)");
                const displayNumber = newRow.querySelector("td:nth-child(2)");
                const title = newRow.querySelector("td:nth-child(3)");
                const imgSrc = newRow.querySelector("td:nth-child(4) img").src;

                editModalInputs[0].value = id.textContent;
                editModalInputs[1].value = displayNumber.textContent;
                editModalInputs[2].value = title.textContent;
                editModalInputs[3].src = imgSrc;

                const editModalForm =
                  document.getElementById("edit-modal-form");
                const cancelEditButton = document.getElementById("edit-cancel");

                editModalInputs[4].addEventListener("change", (e) => {
                  const selectedFile = e.target.files[0];

                  if (selectedFile) {
                    editModalInputs[3].src = URL.createObjectURL(selectedFile);
                  } else {
                    editModalInputs[3].src = item.src;
                  }
                });

                editModalForm.addEventListener("submit", async (e) => {
                  e.preventDefault();

                  const formData = new FormData();

                  formData.append("display_number", editModalInputs[1].value);
                  formData.append("title", editModalInputs[2].value);
                  formData.append("src", item.src);
                  formData.append("img", editModalInputs[4].files[0]);

                  try {
                    console.log(
                      `/api/${nav.value}/${editModalInputs[0].value}/edit`
                    );

                    const fetchEdit = await fetch(
                      `/api/${nav.value}/${editModalInputs[0].value}/edit`,
                      {
                        method: "PUT",
                        body: formData,
                      }
                    );

                    if (response.ok) {
                      window.location.reload();
                    } else {
                      console.error("Edit failed");
                    }
                  } catch (error) {
                    console.error("Error during editing:", error);
                  }
                });

                cancelEditButton.addEventListener("click", () => {
                  editModal.style.display = "none";
                });

                editModal.style.display = "flex";
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
                  try {
                    const response = await fetch(`/api/${nav.value}/delete`, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        _id: data[index]._id,
                      }),
                    });

                    if (response.ok) {
                      deleteMessage.innerText = `${data[index].title} has been deleted`;
                    } else if (response.status === 404) {
                      deleteMessage.innerText = `Resource not found`;
                    } else {
                      deleteMessage.innerText = `Failed to delete ${data[index].title}!!! Try again later`;
                    }

                    deleteModal.style.display = "none";
                  } catch (error) {
                    console.error("Error during delete:", error);
                    deleteMessage.innerText = `An error occurred during deletion`;
                  }
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
