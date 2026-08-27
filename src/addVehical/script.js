class Vehical {
  constructor(number, owner, phoneNumber) {
    this.number = number;
    this.owner = owner;
    this.phoneNumber = phoneNumber;
    this.id = Date.now();
  }
  getSpacePercentage() {}
  getTypesofVehical() {}
}

class Bike extends Vehical {
  getSpacePercentage() {
    return 1;
  }
  getTypesofVehical() {
    return "Bike";
  }
}

class Car extends Vehical {
  getSpacePercentage() {
    return 3;
  }
  getTypesofVehical() {
    return "Car";
  }
}

class Truck extends Vehical {
  getSpacePercentage() {
    return 5;
  }
  getTypesofVehical() {
    return "Truck";
  }
}

function createVehicle(type, number, owner, phone) {
  if (type === "bike") return new Bike(number, owner, phone);
  if (type === "car") return new Car(number, owner, phone);
  if (type === "truck") return new Truck(number, owner, phone);
  throw new Error("Unknown vehicle type: " + type);
}

class ParkingLot {
  constructor(totalSpace = 100) {
    this.totalSpace = totalSpace;
    this.usedSpace = 0;
    this.vehicles = [];
  }

  getAvailableSpace() {
    return this.totalSpace - this.usedSpace;
  }

  addVehicle(vehicle) {
    const needed = vehicle.getSpacePercentage();
    if (needed > this.getAvailableSpace()) {
      throw new Error("Not enough parking space!");
    }
    this.vehicles.push(vehicle);
    this.usedSpace += needed;
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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = typeInput.value;
  const number = numberInput.value.trim();
  const owner = ownerInput.value.trim();
  const phone = phoneNumber.value.trim();
  if (!number || !owner) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const vehicle = createVehicle(type, number, owner, phone);
    parkingLot.addVehicle(vehicle);
    form.reset();
    renderTable();
  } catch (err) {
    alert(err.message);
  }
});

function renderTable() {
  tableBody.innerHTML = "";
  emptyText.style.display = parkingLot.vehicles.length === 0 ? "block" : "none";

  parkingLot.vehicles.forEach((v) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${v.getTypesofVehical()}</td>
      <td>${v.number}</td>
      <td>${v.owner}</td>
      <td>${v.getSpacePercentage()}%</td>
         <td>${v.phoneNumber}</td>
      <td><button onclick="removeVehicle(${v.id})">Remove</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function removeVehicle(id) {
  parkingLot.removeVehicle(id);
  renderTable();
}

renderTable();

const button = document.getElementById("addBtn");

button.addEventListener("click", function () {
  console.log(this.innerHTML);
});
