const tableNav = document.querySelectorAll(".tableNav");

const fetchGetFunction = async (nav, query) => {
  try {
    const response = await fetch(
      !query ? `/api/${nav}` : `/api/${nav}/${query}`
    );

    if (!response.ok) {
      throw new Error("Error during get", response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during getting: ", error);
  }
};

const fetchPutFunction = async (nav, id, formData, albumId) => {
  const editModalMessage = document.getElementById("edit-modal-message");
  try {
    const response = await fetch(
      !albumId ? `/api/${nav}/${id}/edit` : `/api/${nav}/${albumId}/${id}/edit`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response.ok) {
      window.location.reload();
    } else {
      editModalMessage.textContent =
        "Image too large!!! Add image smaller than 1MB";
      throw new Error("Error during edit", response.status);
    }
  } catch (error) {
    console.error("Error during editing:", error);
  }
};

const fetchPutAlbumFunction = async (nav, id, data) => {
  try {
    const response = await fetch(`/api/${nav}/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error during edit", response.status);
    }

    location.reload();
  } catch (error) {
    console.error("Error during editing:", error);
  }
};

const editSlicesRegular = (nav, newRow, item) => {
  const editModal = document.getElementById("edit-modal");
  const editModalInputs = document.querySelectorAll(".edit-modal-textInput");

  editModalInputs[0].value =
    newRow.querySelector("td:nth-child(1)").textContent;
  editModalInputs[1].value =
    newRow.querySelector("td:nth-child(2)").textContent;
  editModalInputs[2].value =
    newRow.querySelector("td:nth-child(3)").textContent;
  editModalInputs[3].value =
    newRow.querySelector("td:nth-child(4)").textContent;
  editModalInputs[4].src = newRow.querySelector("td:nth-child(5) img").src;

  const editModalSave = document.getElementById("edit-save");
  const cancelEditButton = document.getElementById("edit-cancel");

  editModalInputs[5].addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      editModalInputs[4].src = URL.createObjectURL(selectedFile);
    } else {
      editModalInputs[4].src = item.src;
    }
  });

  editModalSave.addEventListener("click", async () => {
    const formData = new FormData();

    formData.append("display_number", editModalInputs[1].value);
    formData.append("title", editModalInputs[2].value);
    formData.append("price", editModalInputs[3].value);
    formData.append("src", item.src);
    formData.append("img", editModalInputs[5].files[0]);

    await fetchPutFunction(nav, editModalInputs[0].value, formData);
  });

  cancelEditButton.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  editModal.style.display = "flex";
};

const editAlbums = async (
  nav,
  newRow,
  editButton,
  deleteButtons,
  viewButtons,
  index
) => {
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
    await fetchPutAlbumFunction(nav, idTd.textContent, {
      album_number: albumNumberInput.value,
      title: titleInput.value,
    });
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

  newRow.lastElementChild.previousElementSibling.appendChild(sendEditButton);
  newRow.lastElementChild.appendChild(cancelEditButton);
};

const editAlbumItem = (nav, newRow, item, albumId) => {
  const editModal = document.getElementById("edit-modal");
  const editModalInputs = document.querySelectorAll(".edit-modal-textInput");

  editModalInputs[0].value =
    newRow.querySelector("td:nth-child(1)").textContent;
  editModalInputs[1].value =
    newRow.querySelector("td:nth-child(2)").textContent;
  editModalInputs[2].style.display = newRow.querySelector("td:nth-child(4)")
    .textContent
    ? "none"
    : "block";
  editModalInputs[3].style.display = newRow.querySelector("td:nth-child(5)")
    .textContent
    ? "none"
    : "block";
  editModalInputs[4].src = newRow.querySelector("td:nth-child(3) img").src;

  editModalInputs[5].addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      editModalInputs[4].src = URL.createObjectURL(selectedFile);
    } else {
      editModalInputs[4].src = item.src;
    }
  });

  const editModalSave = document.getElementById("edit-save");
  const cancelEditButton = document.getElementById("edit-cancel");

  editModalSave.addEventListener("click", async () => {
    const formData = new FormData();

    formData.append("display_number", editModalInputs[1].value);
    formData.append("src", item.src);
    formData.append("img", editModalInputs[5].files[0]);

    await fetchPutFunction(nav, editModalInputs[0].value, formData, albumId);
  });

  cancelEditButton.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  editModal.style.display = "flex";
};

const deleteFunction = async (nav, item, albumId) => {
  const deleteModal = document.getElementById("delete-modal");
  const deleteMessage = document.getElementById("delete-message");
  const cancelDeleteButton = document.getElementById("delete-cancel");
  const confirmDeleteButton = document.getElementById("delete-confirm");

  deleteMessage.innerText = `Are you sure you want to delete ${
    item.title ? item.title : item.display_number
  }`;

  deleteModal.style.display = "flex";

  cancelDeleteButton.addEventListener("click", () => {
    deleteModal.style.display = "none";
  });

  confirmDeleteButton.addEventListener("click", async () => {
    const btnHolder = document.getElementById("button-holder");

    try {
      const response = await fetch(
        !albumId
          ? `/api/${nav}/${item._id}/delete`
          : `/api/${nav}/${albumId}/${item._id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ src: item.src }),
        }
      );

      if (response.ok) {
        deleteMessage.innerText = `${
          item.title ? item.title : item.display_number
        } has been deleted`;
        btnHolder.innerHTML = "";

        setTimeout(() => window.location.reload(), 3000);
      } else if (response.status === 404) {
        deleteMessage.innerText = `Resource not found`;
        btnHolder.innerHTML = "";

        setTimeout(() => window.location.reload(), 3000);
      } else {
        deleteMessage.innerText = `Failed to delete ${
          item.title ? item.title : item.display_number
        }!!! Try again later`;
        btnHolder.innerHTML = "";

        setTimeout(() => window.location.reload(), 3000);
      }
    } catch (error) {
      console.error("Error during delete:", error);
      deleteMessage.innerText = `An error occurred during deletion`;
    }
  });
};

const displaySlices = async (nav) => {
  const data = await fetchGetFunction(nav);

  const existingDataRows = document.querySelectorAll("#table tr.data-row");
  existingDataRows.forEach((row) => {
    table.removeChild(row);
  });

  const existingHeaderRow = document.querySelector("#table tr.header-row");
  if (existingHeaderRow) {
    table.removeChild(existingHeaderRow);
  }

  const headerRow = document.createElement("tr");
  headerRow.className = "header-row";
  headerRow.innerHTML = `
    <td>ID</td>
    <td>DISPLAY NUMBER</td>
    <td>TITLE</td>
    <td>PRICE</td>
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
        <td>${item.price}</td>
        <td><img class="img" src="${item.src}" /></td>
        <td><button class="data-edit">EDIT</button></td>
        <td><button class="data-delete">DELETE</button></td>
    `;

    table.appendChild(newRow);

    const editButtons = newRow.querySelectorAll("button.data-edit");

    editButtons.forEach((button) =>
      button.addEventListener("click", () =>
        editSlicesRegular(nav, newRow, item)
      )
    );

    const deleteButtons = newRow.querySelectorAll("button.data-delete");

    deleteButtons.forEach((button) =>
      button.addEventListener("click", () => deleteFunction(nav, item))
    );
  });
};

const displayRegular = async (nav) => {
  const data = await fetchGetFunction(nav);

  const existingDataRows = document.querySelectorAll("#table tr.data-row");
  existingDataRows.forEach((row) => {
    table.removeChild(row);
  });

  const existingHeaderRow = document.querySelector("#table tr.header-row");
  if (existingHeaderRow) {
    table.removeChild(existingHeaderRow);
  }

  const headerRow = document.createElement("tr");
  headerRow.className = "header-row";
  headerRow.innerHTML = `
    <td>ID</td>
    <td>DISPLAY NUMBER</td>
    <td>TITLE</td>
    <td>PRICE</td>
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
        <td>${item.price}</td>
        <td><img class="img" src="${item.src}" /></td>
        <td><button class="data-edit">EDIT</button></td>
        <td><button class="data-delete">DELETE</button></td>
    `;

    table.appendChild(newRow);

    const editButtons = newRow.querySelectorAll("button.data-edit");

    editButtons.forEach((button) =>
      button.addEventListener("click", () =>
        editSlicesRegular(nav, newRow, item)
      )
    );

    const deleteButtons = newRow.querySelectorAll("button.data-delete");

    deleteButtons.forEach((button) =>
      button.addEventListener("click", () => deleteFunction(nav, item))
    );
  });
};

const displayAlbumData = async (nav, album) => {
  const { albumId, data } = await fetchGetFunction(
    nav,
    `${album._id}?page=1&size=all`
  );

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

    table.appendChild(newRow);

    const editButtons = newRow.querySelectorAll("button.data-edit");

    editButtons.forEach((button) => {
      button.addEventListener("click", () =>
        editAlbumItem(nav, newRow, item, albumId._id)
      );
    });

    const deleteButtons = newRow.querySelectorAll("button.data-delete");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () =>
        deleteFunction(nav, item, albumId._id)
      );
    });
  });
};

const displayAlbums = async (nav) => {
  const data = await fetchGetFunction(nav);

  const existingDataRows = document.querySelectorAll("#table tr.data-row");
  existingDataRows.forEach((row) => {
    table.removeChild(row);
  });

  const existingHeaderRow = document.querySelector("#table tr.header-row");
  if (existingHeaderRow) {
    table.removeChild(existingHeaderRow);
  }

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

    editButtons.forEach((button, index) =>
      button.addEventListener("click", () =>
        editAlbums(nav, newRow, button, deleteButtons, viewButtons, index)
      )
    );

    deleteButtons.forEach((button) =>
      button.addEventListener("click", () => deleteFunction(nav, item))
    );

    viewButtons.forEach((button) =>
      button.addEventListener("click", () => displayAlbumData(nav, item))
    );
  });
};

const renderDataTable = (nav) => {
  switch (nav) {
    case "slices":
      displaySlices(nav);
      break;
    case "regular":
      displayRegular(nav);
      break;
    case "albums":
      displayAlbums(nav);
      break;
    default:
      break;
  }
};

tableNav.forEach((nav) => {
  nav.addEventListener("click", () => renderDataTable(nav.value));
});
