const editDialog = document.getElementById("editDailog");

export function showEditDialog(vehicle, onSave) {
  editDialog.innerHTML = `
    <div class="edit-box">
      <h2>Edit Vehicle</h2>

      <div>
        <label>Vehicle Type</label>

        <select id="editVehicleType">
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div>
        <label>Vehicle Number</label>

        <input
          type="text"
          id="editVehicleNumber"
          value="${vehicle.number}"
        />
      </div>

      <div>
        <label>Phone Number</label>

        <input
          type="number"
          id="editPhoneNumber"
          value="${vehicle.phoneNumber}"
        />
      </div>

      <div>
        <label>Owner</label>

        <input
          type="text"
          id="editOwner"
          value="${vehicle.owner}"
        />
      </div>

      <button id="cancelEdit">
        Cancel
      </button>

      <button id="saveEdit">
        Save
      </button>
    </div>
  `;

  document.getElementById("editVehicleType").value =
    vehicle.getTypesofVehicle().toLowerCase();

  editDialog.classList.add("show");

  document
    .getElementById("cancelEdit")
    .addEventListener("click", hideEditDialog);

  document
    .getElementById("saveEdit")
    .addEventListener("click", () => {
      const type =
        document.getElementById("editVehicleType").value;

      const number =
        document.getElementById("editVehicleNumber").value.trim();

      const phone =
        document.getElementById("editPhoneNumber").value.trim();

      const owner =
        document.getElementById("editOwner").value.trim();

      onSave(vehicle.id, type, number, owner, phone);
    });
}

export function hideEditDialog() {
  editDialog.classList.remove("show");
}