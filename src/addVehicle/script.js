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

  parkingLot.vehicles.forEach((v) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${v.getTypesofVehicle()}</td>
      <td>${v.number}</td>
      <td>${v.owner}</td>
      <td>${v.getSpacePercentage()}%</td>
         <td>${v.phoneNumber}</td>
     <td><button class="remove-btn" data-id="${v.id}">Remove</button></td>
    `;
    tableBody.appendChild(row);
    const removeButton = row.querySelector(".remove-btn");

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
  const remaining = parkingLot.getAvailableSpace();
  availableSpace.innerText = remaining;
  spaceRange.value = remaining;
}

function updateRevenu() {
  frevenu.innerText = parkingLot.income;
}
renderTable();

availableSpace.innerText = parkingLot.getAvailableSpace();

title.innerText = "Welcome to the XYZ CarParking";

desc.innerText =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, in? Temporibus voluptatem illum eum quo sed cum cupiditate porro sit, in deleniti nobis adipisci consequuntur veniam quaerat, quas laboriosam error.";

formTittle.innerHTML = "<h1>Add Your Vehical Details</h1>";

titledesc.innerHTML = "Add your Vehical all Deatils in this";

function toastMessage(message) {
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
