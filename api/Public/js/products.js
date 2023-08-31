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

        const headerRow = document.createElement("tr");
        headerRow.className = "header-row";
        headerRow.innerHTML = `
            <td>ID</td>
            <td>DISPLAY NUMBER</td>
            <td>TITLE</td>
            <td>IMAGE</td>
          `;

        table.appendChild(headerRow);

        data.forEach((item) => {
          const newRow = document.createElement("tr");
          newRow.className = "data-row";
          newRow.innerHTML = `
              <td>${item._id}</td>
              <td>${item.display_number}</td>
              <td>${item.title}</td>
              <td>${item.src}</td>
              <td><button id="data-edit">EDIT</button></td>
              <td><button id="data-delete">DELETE</button></td>
            `;

          table.appendChild(newRow);
        });
      } else {
        console.error("API call failed");
      }
    } catch (error) {
      console.error("An error occurred during API call", error);
    }
  });
});
