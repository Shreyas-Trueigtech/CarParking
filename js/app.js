import ParkingLot from "./services/parkingLot/index.js";
import { createVehicle } from "./services/vehicleFactory/index.js";

import { renderTable } from "./ui/table/index.js";
import { showEditDialog, hideEditDialog } from "./ui/editDialog/index.js";
import { toastMessage } from "./ui/toast/index.js";

const parkingLot = new ParkingLot(100);

const form = document.getElementById("vehicleForm");

const typeInput = document.getElementById("vehicleType");
const numberInput = document.getElementById("vehicleNumber");
const phoneInput = document.getElementById("phoneNumber");
const ownerInput = document.getElementById("owner");

const availableSpace = document.getElementById("availableSpace");
const spaceRange = document.getElementById("spaceRange");
const revenue = document.getElementById("revenu");

function saveEditedVehicle(id, type, number, owner, phone) {
  if (!number || !owner || !phone) {
    alert("Please fill all fields");
    return;
  }

  try {
    const result = parkingLot.editVehicle(
      id,
      type,
      number,
      owner,
      phone,
      createVehicle,
    );

    hideEditDialog();

    updateUI();

    if (result.priceDifference > 0) {
      toastMessage(`Take ₹${result.priceDifference} more from vehicle owner`);
    } else if (result.priceDifference < 0) {
      toastMessage(
        `Return ₹${Math.abs(result.priceDifference)} to vehicle owner`,
      );
    } else {
      toastMessage("Vehicle updated successfully 🚗");
    }
  } catch (error) {
    toastMessage(error.message);
  }
}

function handleRemove(id) {
  try {
    parkingLot.removeVehicle(id);

    updateUI();

    toastMessage("Vehicle removed successfully 🚗");
  } catch (error) {
    toastMessage(error.message);
  }
}

function updateUI() {
  availableSpace.innerText = parkingLot.getAvailableSpace();

  spaceRange.value = parkingLot.getAvailableSpace();

  revenue.innerText = parkingLot.income;

  renderTable(parkingLot, handleEdit, handleRemove);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const type = typeInput.value;
  const number = numberInput.value.trim();
  const owner = ownerInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!number || !owner || !phone) {
    alert("Please fill all fields.");
    return;
  }

  try {
    const vehicle = createVehicle(type, number, owner, phone);

    parkingLot.addVehicle(vehicle);

    form.reset();

    updateUI();

    toastMessage("Vehicle added successfully 🚗");
  } catch (error) {
    toastMessage(error.message);
  }
});

function handleEdit(vehicle) {
  showEditDialog(vehicle, saveEditedVehicle);
}

updateUI();

const title = document.getElementById("title");
const titledesc = document.getElementById("titledesc");
const formTittle = document.getElementById("formTittle");
const desc = document.getElementById("desc");

title.innerText = "Welcome to the XYZ CarParking";

desc.innerText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, in? Temporibus voluptatem illum eum quo sed cum cupiditate porro sit, in deleniti nobis adipisci consequuntur veniam quaerat, quas laboriosam error.";

formTittle.innerHTML = "<h1>Add Your Vehical Details</h1>";

titledesc.innerHTML = "Add your Vehical all Deatils in this";
