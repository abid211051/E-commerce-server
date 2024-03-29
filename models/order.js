const { Schema, model } = require('mongoose');
const { CartSchema } = require('./cartItem');

const orderSchema = Schema({
    transactionId: { type: String, unique: true },
    customer: {
        deliveryAddress: {
            address1: { type: String },
            address2: { type: String },
            city: { type: String },
            postcode: { type: Number },
            state: { type: String },
            phone: {
                type: String,
                validate: {
                    validator: (value) => value !== "",
                    message: "Phone can't remain empty"
                }
            }
        },
        paymentType: { type: String },
    },
    cartitems: [CartSchema],
    orderTime: { type: Date, default: new Date() },
    price: { type: Number },
    paymentStatus: { type: String, default: "Failed", enum: ["Pending", "Success", "Failed"] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    coupon: String
})
module.exports.Order = model('Order', orderSchema);