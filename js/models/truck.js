import Vehicle from "./vehicle.js";

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