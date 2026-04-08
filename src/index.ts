import {
  type Parcel,
  type ParcelState,
  createParcel,
  transition,
} from "./fsm.js";

const vintedOrder: Parcel = createParcel("333");

let currentState = vintedOrder.currentState;
console.log("Initial State: " + currentState);

try {
  vintedOrder.currentState = transition(vintedOrder, "start");
  console.log("Transitioned to: " + vintedOrder.currentState);
} catch (error) {
  console.log("Error: " + error);
}

vintedOrder.paid = true;

try {
  vintedOrder.currentState = transition(vintedOrder, "start");
  console.log("Transitioned to: " + vintedOrder.currentState);
} catch (error) {
  console.log("Error: " + error);
}

vintedOrder.packed = true

vintedOrder.currentState = transition(vintedOrder, "dispatch");
console.log("Transitioned to: " + vintedOrder.currentState);

try {
  vintedOrder.currentState = transition(vintedOrder, "delivering");
  console.log("Transitioned to: " + vintedOrder.currentState);
} catch (error) {
  console.log("Error: " + error);
}

vintedOrder.targetAddress = {
  addressLine1: "11 TypeScript Street",
  postcode: "TS5 8TS",
  town: "TypeScript Town",
  country: "TS"
}

try {
  vintedOrder.currentState = transition(vintedOrder, "delivering");
  console.log("Transitioned to: " + vintedOrder.currentState);
} catch (error) {
  console.log("Error: " + error);
}

vintedOrder.currentState = transition(vintedOrder, "deliver");
console.log("Transitioned to: " + vintedOrder.currentState);

try {
  transition(vintedOrder, "fail");
} catch (error) {
  console.log("Error: " + error);
}
