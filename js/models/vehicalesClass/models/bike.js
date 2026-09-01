import Vehicle from "../index.js";

export default class Bike extends Vehicle {
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