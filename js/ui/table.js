export function renderTable(parkingLot, onEdit, onRemove) {
  const tableBody = document.getElementById("vehicleTableBody");

  tableBody.innerHTML = "";
  console.log("parkingLot.vehicles", parkingLot.vehicles);

  parkingLot.vehicles.forEach((vehicle) => {
    const row = document.createElement("tr");

    console.log("vehicle", vehicle?.getParkingPrices());

    row.innerHTML = `
      <td>${vehicle.getTypesofVehicle()}</td>
      <td>${vehicle.number}</td>
      <td>${vehicle.owner}</td>
      <td>${vehicle.getSpacePercentage()}%</td>
       <td>${vehicle?.getParkingPrices()}${" "}₹</td>
      <td>${vehicle.phoneNumber}</td>

      <td>
        <button class="remove-btn">
          Remove
        </button>
      </td>

      <td>
        <button class="edit-btn">
          Edit
        </button>
      </td>
    `;

    row.querySelector(".remove-btn").addEventListener("click", () => {
      onRemove(vehicle.id);
    });

    row.querySelector(".edit-btn").addEventListener("click", () => {
      onEdit(vehicle);
    });

    tableBody.appendChild(row);
  });
}
