export default class Vehicle {
  constructor(number, owner, phoneNumber) {
    this.number = number;
    this.owner = owner;
    this.phoneNumber = phoneNumber;
    this.id = Date.now();
  }

  getSpacePercentage() {}

  getTypesofVehicle() {}

  getParkingPrices() {}
}
