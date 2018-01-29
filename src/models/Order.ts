import * as mongoose from "mongoose";

export type OrderModel = mongoose.Document & {
  orderId: Number,
  companyName: string,
  customerAddress: string,
  orderedItem: string,
};

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, unique: true, required: true, dropDups: true },
  companyName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  orderedItem: { type: String, required: true }

}, { timestamps: true });

// export const Order: OrderType = mongoose.model<OrderType>('Order', orderSchema);
const Order = mongoose.model("Order", orderSchema);
export default Order;