const albumsOptGroup = document.getElementById("albumsOptGroup");
const select = document.getElementById("select");
const inputHolder = document.getElementById("inputHolder");
const btnHolder = document.getElementById("btnHolder");

const fetchFunction = async (nav) => {
  try {
    const response = await fetch(`/${nav}`);

    if (!response.ok) {
      throw new Error(response.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetch: ", error);
  }
};

const createNewRegularSlice = async (route, newItem) => {
  const formData = new FormData();

  formData.append("title", newItem.title);
  formData.append("price", `$${newItem.price}`);
  formData.append("src", newItem.src);
  formData.append("img", newItem.img.files[0]);

  try {
    const response = await fetch(`/${route}/add`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Adding product failed");
    }
  } catch (error) {
    console.error("Error during adding product:", error);
  }
};

const createNewAlbum = async (route, title) => {
  try {
    const response = await fetch(`/${route}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(title),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Adding album failed");
    }
  } catch (error) {
    console.error("Error during adding album:", error);
  }
};

const createNewAlbumItem = async (route, newItem) => {
  const formData = new FormData();
  formData.append("tag", `$${newItem.tag}`);
  formData.append("src", newItem.src);
  formData.append("img", newItem.img.files[0]);

  try {
    const response = await fetch(`/${route}/${newItem.albumId}/add`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Adding product failed");
    }
  } catch (error) {
    console.error("Error during adding product:", error);
  }
};

const displayAlbums = async () => {
  const data = await fetchFunction("albums");

  data.forEach((el, index) => {
    const option = document.createElement("option");
    option.setAttribute("value", el.title);
    option.setAttribute("key", el._id);
    option.setAttribute("index", index);
    option.textContent = el.title;

    albumsOptGroup.appendChild(option);
  });
};

const createInput = (id, placeholder) => {
  const input = document.createElement("input");
  input.setAttribute("id", id);
  input.placeholder = placeholder;

  return input;
};

const createCheckboxInput = (id, textContent) => {
  const span = document.createElement("span");
  span.setAttribute("class", `${id}Span`);

  const label = document.createElement("label");
  label.setAttribute("id", `{id}Label`);
  label.textContent = textContent;

  const input = document.createElement("input");
  input.setAttribute("id", `${id}Input`);
  input.type = "checkbox";

  span.appendChild(label);
  span.appendChild(input);
  return span;
};

const createFileInput = (id) => {
  const fileInput = createInput(
    id,
    `New ${select.options[select.selectedIndex].text} file`
  );
  fileInput.type = "file";
  return fileInput;
};

const createImg = (id) => {
  const img = document.createElement("img");
  img.setAttribute("id", id);
  return img;
};

const createButton = (id) => {
  const button = document.createElement("button");
  button.setAttribute("id", id);
  button.textContent = "SUBMIT";
  return button;
};

const displaySlice = (definedAlbum) => {
  inputHolder.innerHTML = "";
  btnHolder.innerHTML = "";

  const titleInput = createInput(
    "formTitleInput",
    `New ${select.options[select.selectedIndex].text} title`
  );

  const priceInput = createInput(
    "formPriceInput",
    `New ${select.options[select.selectedIndex].text} price`
  );

  const fileInput = createFileInput("formFileInput");

  const img = createImg("img");

  const button = createButton("newProductButton");

  fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      img.src = URL.createObjectURL(selectedFile);
    }
  });

  inputHolder.appendChild(titleInput);
  inputHolder.appendChild(priceInput);
  inputHolder.appendChild(fileInput);
  inputHolder.appendChild(img);
  btnHolder.appendChild(button);

  button.addEventListener("click", () =>
    createNewRegularSlice(definedAlbum, {
      title: titleInput.value,
      price: priceInput.value,
      img: fileInput,
      src: fileInput.files[0]
        ? `${select.options[select.selectedIndex].text}/unset/${
          fileInput.files[0].name
        }`
        : "",
    })
  );
};

const displayRegular = (definedAlbum) => {
  inputHolder.innerHTML = "";
  btnHolder.innerHTML = "";

  const titleInput = createInput(
    "formTitleInput",
    `New ${select.options[select.selectedIndex].text} title`
  );

  const priceInput = createInput(
    "formPriceInput",
    `New ${select.options[select.selectedIndex].text} price`
  );

  const fileInput = createFileInput("formFileInput");

  const img = createImg("img");

  const button = createButton("newProductButton");

  fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      img.src = URL.createObjectURL(selectedFile);
    }
  });

  inputHolder.appendChild(titleInput);
  inputHolder.appendChild(priceInput);
  inputHolder.appendChild(fileInput);
  inputHolder.appendChild(img);
  btnHolder.appendChild(button);

  btnHolder.addEventListener("click", () =>
    createNewRegularSlice(definedAlbum, {
      title: titleInput.value,
      price: priceInput.value,
      img: fileInput,
      src: fileInput.files[0]
        ? `${select.options[select.selectedIndex].text}/unset/${
          fileInput.files[0].name
        }`
        : "",
    })
  );
};

const displayAlbum = async (definedAlbum) => {
  inputHolder.innerHTML = "";
  btnHolder.innerHTML = "";

  const titleInput = createInput(
    "formTitleInput",
    `New ${select.options[select.selectedIndex].text} title`
  );

  const button = createButton("newProductButton");

  inputHolder.appendChild(titleInput);
  btnHolder.appendChild(button);

  button.addEventListener("click", () =>
    createNewAlbum(definedAlbum, { title: titleInput.value })
  );
};

const displayAlbumItem = (definedAlbum, albumId, index) => {
  inputHolder.innerHTML = "";
  btnHolder.innerHTML = "";

  const albumItemTitle = document.createElement("div");
  albumItemTitle.setAttribute("class", "albumItemTitle");

  albumItemTitle.textContent = `New ${
    select.options[select.selectedIndex].text
  } item`;

  const firstPhotoInput = createCheckboxInput(
    "formFirstPhoto",
    `New ${select.options[select.selectedIndex].text} first photo?`
  );

  const fileInput = createFileInput("formFileInput");

  const img = createImg("img");

  const button = createButton("newProductButton");

  fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      img.src = URL.createObjectURL(selectedFile);
    }
  });

  inputHolder.appendChild(albumItemTitle);
  inputHolder.appendChild(firstPhotoInput);
  inputHolder.appendChild(fileInput);
  inputHolder.appendChild(img);
  btnHolder.appendChild(button);

  btnHolder.addEventListener("click", () =>
    createNewAlbumItem(definedAlbum, {
      albumId: albumId,
      tag: firstPhotoInput.querySelector("input").checked,
      src: fileInput.files[0]
        ? `${index + 1}.${select.options[select.selectedIndex].text}/unset/${
          fileInput.files[0].name
        }`
        : "",
      img: fileInput,
    })
  );
};

const defineAlbum = () => {
  const key = select.options[select.selectedIndex].getAttribute("key");
  const index = select.options[select.selectedIndex].getAttribute("index");
  displayAlbums();

  switch (select.value) {
    case "slices":
      displaySlice("basics/slices");
      break;
    case "regular":
      displayRegular("basics/regular");
      break;
    case "albums":
      displayAlbum("albums");
      break;
    default:
      displayAlbumItem("albums", key, parseInt(index));
      break;
  }
};

select.addEventListener("change", defineAlbum);
defineAlbum();
