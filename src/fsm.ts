// A type for all possible parcel states (pending, processing, dispatched, out_for_delivery, delivered, failed, returned)
export type ParcelState =
  | "pending"
  | "processing"
  | "dispatched"
  | "out_for_delivery"
  | "delivered"
  | "failed" //terminal state
  | "returned"; //terminal state

// A type for all possible transitions/events (think about what triggers a state change, e.g. dispatch, deliver, fail etc.)
export type ParcelEvent =
  | "request"
  | "start"
  | "dispatch"
  | "delivering"
  | "deliver"
  | "fail"
  | "return";

export interface Address {
  addressLine1: string,
    postcode: string,
    town: string,
    country: string
}

// An interface for what a parcel looks like
export interface Parcel {
  _id: string;
  currentState: ParcelState;
  paid: boolean,
  packed: boolean,
  targetAddress?: Address,
  // Audit Fields
  createdAt: Date;
  lastUpdatedAt: Date;
}

export type StateEventMapping = {
  [key in ParcelState]?: {
    [event in ParcelEvent]?: ParcelState;
  };
};

export const transitionMap: StateEventMapping = {
  pending: { start: "processing", fail: "failed" },
  processing: { dispatch: "dispatched", fail: "failed" },
  dispatched: { delivering: "out_for_delivery", fail: "failed" },
  out_for_delivery: { deliver: "delivered", fail: "failed" },
  delivered: { return: "returned", fail: "failed" },
};

export function transition(
  parcel: Parcel,
  event: ParcelEvent,
): ParcelState {
  // If transition is valid, return the next state
  const nextState = transitionMap[parcel.currentState]?.[event];
  if (nextState) {
      if (event === "start" && !parcel.paid) {
        throw new Error("Parcel must be paid before processing can start");
      }
      if (event === "dispatch" && !parcel.packed) {
        throw new Error("Parcel must be packed before it can be dispatched");
      }
      if (event === "delivering" && !parcel.targetAddress) {
        throw new Error("Parcel must have a delivery address before going out for delivery");
      }
    return nextState;
  }
  throw new Error(`Invalid transition: ${parcel.currentState} + ${event}`);
}

export function createParcel(id: string): Parcel {
  const newParcel: Parcel = {
    _id: id,
    currentState: "pending",
    paid: false,
    packed: false,
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  };
  return newParcel;
}
