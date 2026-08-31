class Vehicle {
  constructor(number, owner, phoneNumber, rate) {
    this.number = number;
    this.owner = owner;
    this.rate = rate;
    this.phoneNumber = phoneNumber;
    this.id = Date.now();
  }
  getSpacePercentage() {}
  getTypesofVehicle() {}
  getParkingPrices() {}
}

class Bike extends Vehicle {
  getSpacePercentage() {
    return 1;
  }
  getTypesofVehicle() {
    return "Bike";
  }
  getParkingPrices() {
    return 10;
  }
}

class Car extends Vehicle {
  getSpacePercentage() {
    return 3;
  }
  getTypesofVehicle() {
    return "Car";
  }
  getParkingPrices() {
    return 30;
  }
}

class Truck extends Vehicle {
  getSpacePercentage() {
    return 5;
  }
  getTypesofVehicle() {
    return "Truck";
  }
  getParkingPrices() {
    return 50;
  }
}

const vehicleTypes = {
  bike: Bike,
  car: Car,
  truck: Truck,
};

function createVehicle(type, number, owner, phone, rate) {
  return new vehicleTypes[type](number, owner, phone, rate);
}

class ParkingLot {
  constructor(totalSpace = 100) {
    this.totalSpace = totalSpace;
    this.usedSpace = 0;
    this.vehicles = [];
    this.income = 0;
  }

  getAvailableSpace() {
    return this.totalSpace - this.usedSpace;
  }

  addRevenu(rate) {
    return (this.income += rate);
  }

  editVehicle(type, number, owner, phone, rate) {
    this.type = type;
    this.number = number;
    this.owner = owner;
    this.phone = phone;
    this.rate = rate;
  }

  addVehicle(vehicle) {
    const needed = vehicle.getSpacePercentage();
    if (needed > this.getAvailableSpace()) {
      toastMessage("Not Enough Space!..");
      return;
    }
    this.vehicles.push(vehicle);
    this.usedSpace += needed;
    toastMessage("Vehical added successfully 🚗");
  }

  removeVehicle(id) {
    const index = this.vehicles.findIndex((v) => v.id === id);
    if (index === -1) return;
    this.usedSpace -= this.vehicles[index].getSpacePercentage();
    this.vehicles.splice(index, 1);
  }
}

const parkingLot = new ParkingLot(100);
const form = document.getElementById("vehicleForm");
const typeInput = document.getElementById("vehicleType");
const numberInput = document.getElementById("vehicleNumber");
const phoneNumber = document.getElementById("phoneNumber");
const ownerInput = document.getElementById("owner");
const tableBody = document.getElementById("vehicleTableBody");
const emptyText = document.getElementById("emptyText");
const availableSpace = document.getElementById("availableSpace");
const spaceRange = document.getElementById("spaceRange");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const formTittle = document.getElementById("formTittle");
const titledesc = document.getElementById("titledesc");
const toast = document.getElementById("toast");
const frevenu = document.getElementById("revenu");
const editDailog = document.getElementById("editDailog");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = typeInput.value;
  const number = numberInput.value.trim();
  const owner = ownerInput.value.trim();
  const phone = phoneNumber.value.trim();
  const rate = 10;
  if (!number || !owner) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const vehicle = createVehicle(type, number, owner, phone, rate);
    parkingLot.addVehicle(vehicle);
    updateAvailableSpace();
    parkingLot.addRevenu(vehicle.getParkingPrices());
    updateRevenu();
    form.reset();
    renderTable();
  } catch (err) {
    alert(err.message);
  }
});

function renderTable() {
  tableBody.innerHTML = "";
  console.log("heee[0]", parkingLot.vehicles[0]);

  parkingLot.vehicles.forEach((v) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${v.getTypesofVehicle()}</td>
      <td>${v.number}</td>
      <td>${v.owner}</td>
      <td>${v.getSpacePercentage()}%</td>
         <td>${v.phoneNumber}</td>
     <td><button class="remove-btn" data-id="${v?.id}">Remove</button></td>
          <td><button class="edit-btn" data-id="${v?.id}">Edit</button></td>
    `;
    tableBody.appendChild(row);
    const removeButton = row.querySelector(".remove-btn");
    const editButton = row.querySelector(".edit-btn");

    editButton.addEventListener("click", () => {
      editDailogToggle(v);
      console.log("List  ", parkingLot?.vehicles);
      console.log("Id is this : ", v?.id);
    });

    removeButton.addEventListener("click", () => {
      removeVehicle(v.id);
    });
  });
}

function removeVehicle(id) {
  parkingLot.removeVehicle(id);
  renderTable();
  toastMessage("Vehical Removed successfully 🚗");
  updateAvailableSpace();
}

function updateAvailableSpace() {
  const remaining = parkingLot?.getAvailableSpace();
  availableSpace.innerText = remaining;
  spaceRange.value = remaining;
}

function updateRevenu() {
  parkingLot.income = parkingLot.vehicles.reduce(
    (total, vehicle) => total + vehicle.getParkingPrices(),
    0,
  );

  frevenu.innerText = parkingLot.income;
}
renderTable();

availableSpace.innerText = parkingLot?.getAvailableSpace();

title.innerText = "Welcome to the XYZ CarParking";

desc.innerText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, in? Temporibus voluptatem illum eum quo sed cum cupiditate porro sit, in deleniti nobis adipisci consequuntur veniam quaerat, quas laboriosam error.";

formTittle.innerHTML = "<h1>Add Your Vehical Details</h1>";

titledesc.innerHTML = "Add your Vehical all Deatils in this";

function toastMessage(message, time = 3000) {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, time);
}

function removeEditDailog() {
  editDailog.classList.remove("show");
}

function editDailogToggle(vehicle) {
  editDailog.innerHTML = `
    <div class="edit-box">
      <h2>Edit Vehicle</h2>

      <div>
        <label for="editVehicleType">Vehicle Type</label>
        <select id="editVehicleType">
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <div>
        <label for="editVehicleNumber">Vehicle Number</label>
        <input
          type="text"
          id="editVehicleNumber"
          value="${vehicle.number}"
        />
      </div>

      <div>
        <label for="editPhoneNumber">Phone Number</label>
        <input
          type="number"
          id="editPhoneNumber"
          value="${vehicle.phoneNumber}"
        />
      </div>

      <div>
        <label for="editOwner">Owner</label>
        <input
          type="text"
          id="editOwner"
          value="${vehicle.owner}"
        />
      </div>

      <button id="cancelEdit">Cancel</button>
      <button id="saveEdit">Save</button>
    </div>
  `;

  document.getElementById("editVehicleType").value = vehicle
    .getTypesofVehicle()
    .toLowerCase();

  editDailog.classList.add("show");

  document.getElementById("cancelEdit").addEventListener("click", () => {
    removeEditDailog();
  });

  document.getElementById("saveEdit").addEventListener("click", () => {
    saveEditedVehicle(vehicle.id);
  });
}
function saveEditedVehicle(id) {
  const vehicle = parkingLot.vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return;
  }

  const type = document.getElementById("editVehicleType").value;
  const number = document.getElementById("editVehicleNumber").value.trim();
  const phone = document.getElementById("editPhoneNumber").value.trim();
  const owner = document.getElementById("editOwner").value.trim();

  if (!number || !owner || !phone) {
    alert("Please fill all fields");
    return;
  }

  const oldSpace = vehicle.getSpacePercentage();
  const oldPrice = vehicle.getParkingPrices();

  const newVehicle = createVehicle(type, number, owner, phone, vehicle.rate);

  const newSpace = newVehicle.getSpacePercentage();
  const newPrice = newVehicle.getParkingPrices();

  const spaceDifference = newSpace - oldSpace;
  const priceDifference = newPrice - oldPrice;

  if (spaceDifference > parkingLot.getAvailableSpace()) {
    toastMessage("Not enough parking space!");
    return;
  }

  parkingLot.usedSpace += spaceDifference;

  const index = parkingLot.vehicles.findIndex((v) => v.id === id);

  newVehicle.id = id;

  parkingLot.vehicles[index] = newVehicle;

  updateRevenu();
  removeEditDailog();
  renderTable();
  updateAvailableSpace();

  if (priceDifference > 0) {
    toastMessage(`Take ₹${priceDifference} more from vehicle owner`);
  } else if (priceDifference < 0) {
    toastMessage(`Return ₹${Math.abs(priceDifference)} to vehicle owner`);
  } else {
    toastMessage("Vehicle updated successfully 🚗");
  }
}
