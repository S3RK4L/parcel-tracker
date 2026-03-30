// A type for all possible parcel states (pending, processing, dispatched, out_for_delivery, delivered, failed, returned)
type ParcelState =
  | "pending"
  | "processing"
  | "dispatched"
  | "out_for_delivery"
  | "delivered"
  | "failed" //terminal state
  | "returned"; //terminal state

// A type for all possible transitions/events (think about what triggers a state change, e.g. dispatch, deliver, fail etc.)
type ParcelEvent =
  | "request"
  | "start"
  | "dispatch"
  | "delivering"
  | "deliver"
  | "fail"
  | "return";

// An interface for what a parcel looks like
interface Parcel {
  _id: string;
  currentState: ParcelState;
  createdAt: Date;
  lastUpdatedAt: Date;
}

type StateEventMapping = {
  [key in ParcelState]?: {
    [event in ParcelEvent]?: ParcelState;
  };
};

const transitionMap: StateEventMapping = {
  pending: { start: "processing", fail: "failed" },
  processing: { dispatch: "dispatched", fail: "failed" },
  dispatched: { delivering: "out_for_delivery", fail: "failed" },
  out_for_delivery: { deliver: "delivered", fail: "failed" },
  delivered: { return: "returned", fail: "failed" },
};
