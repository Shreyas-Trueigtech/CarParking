import Vehicle from "./vehicle.js";

export default class Car extends Vehicle {
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