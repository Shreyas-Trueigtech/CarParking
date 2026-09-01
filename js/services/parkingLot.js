export default class ParkingLot {
  constructor(totalSpace = 100) {
    this.totalSpace = totalSpace;
    this.usedSpace = 0;
    this.vehicles = [];
    this.income = 0;
  }

  getAvailableSpace() {
    return this.totalSpace - this.usedSpace;
  }

  addVehicle(vehicle) {
    const neededSpace = vehicle.getSpacePercentage();

    if (neededSpace > this.getAvailableSpace()) {
      throw new Error("Not Enough Space!");
    }

    this.vehicles.push(vehicle);
    this.usedSpace += neededSpace;

    this.income += vehicle.getParkingPrices();
  }

  removeVehicle(id) {
    const index = this.vehicles.findIndex((vehicle) => vehicle.id === id);

    if (index === -1) {
      return;
    }

    const vehicle = this.vehicles[index];

    this.usedSpace -= vehicle.getSpacePercentage();
    this.income -= vehicle.getParkingPrices();

    this.vehicles.splice(index, 1);
  }

  editVehicle(id, type, number, owner, phone, createVehicle) {
    const vehicle = this.vehicles.find((vehicle) => vehicle.id === id);

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    const oldSpace = vehicle.getSpacePercentage();
    const oldPrice = vehicle.getParkingPrices();

    const newVehicle = createVehicle(type, number, owner, phone);

    const newSpace = newVehicle.getSpacePercentage();
    const newPrice = newVehicle.getParkingPrices();

    const spaceDifference = newSpace - oldSpace;

    if (spaceDifference > this.getAvailableSpace()) {
      throw new Error("Not enough parking space!");
    }

    this.usedSpace += spaceDifference;

    this.income += newPrice - oldPrice;

    newVehicle.id = id;

    const index = this.vehicles.findIndex((vehicle) => vehicle.id === id);

    this.vehicles[index] = newVehicle;

    return {
      oldPrice,
      newPrice,
      priceDifference: newPrice - oldPrice,
    };
  }
}
