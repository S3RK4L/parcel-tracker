import {
  type Parcel,
  type ParcelState,
  createParcel,
  transition,
} from "./fsm.js";

const vintedOrder: Parcel = createParcel("333");

let currentState = vintedOrder.currentState;
console.log("Initial State: " + currentState);

currentState = transition(currentState, "start");
console.log("Transitioned to: " + currentState);

currentState = transition(currentState, "dispatch");
console.log("Transitioned to: " + currentState);

currentState = transition(currentState, "delivering");
console.log("Transitioned to: " + currentState);

currentState = transition(currentState, "deliver");
console.log("Transitioned to: " + currentState);

try {
  transition(currentState, "fail");
} catch (error) {
  console.log("Error: " + error);
}
