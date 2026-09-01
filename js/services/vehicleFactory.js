import Bike from "../models/bike.js";
import Car from "../models/car.js";
import Truck from "../models/truck.js";

const vehicleTypes = {
  bike: Bike,
  car: Car,
  truck: Truck,
};

export function createVehicle(type, number, owner, phone) {
  const VehicleClass = vehicleTypes[type];

  if (!VehicleClass) {
    throw new Error("Invalid vehicle type");
  }

  return new VehicleClass(number, owner, phone);
}