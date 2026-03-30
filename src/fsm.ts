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

// An interface for what a parcel looks like
export interface Parcel {
  _id: string;
  currentState: ParcelState;
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
  currentState: ParcelState,
  event: ParcelEvent,
): ParcelState {
  // If transition is valid, return the next state
  const nextState = transitionMap[currentState]?.[event];
  if (nextState) {
    return nextState;
  }
  throw new Error(`Invalid transition: ${currentState} + ${event}`);
}

export function createParcel(id: string): Parcel {
  const newParcel: Parcel = {
    _id: id,
    currentState: "pending",
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  };
  return newParcel;
}
