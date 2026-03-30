// A type for all possible parcel states (pending, processing, dispatched, out_for_delivery, delivered, failed, returned)
type ParcelState =
  | "pending"
  | "processing"
  | "dispatched"
  | "out_for_delivery"
  | "delivered"
  | "failed"
  | "returned";

// A type for all possible transitions/events (think about what triggers a state change, e.g. dispatch, deliver, fail etc.)
type ParcelEvent =
  | "request"
  | "start"
  | "dispatch"
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
