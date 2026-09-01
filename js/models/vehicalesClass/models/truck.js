import Vehicle from "../index.js";

export default class Truck extends Vehicle {
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