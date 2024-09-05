const orderModel = require("../models/order_model");
const userModel = require("../models/user_schema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Validate input data
        const { userId, items, amount, address } = req.body;
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create a new order
        const newOrder = new orderModel({ userId, items, amount, address });
        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line items for Stripe checkout
        const line_items = items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80, // Ensure this calculation matches the price format Stripe expects
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80,
            },
            quantity: 1
        });

        // Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        return res.json({
            success: true,
            message: "Payment session created successfully",
            session_url: session.url
        });

    } catch (err) {
        console.log("error in payment", err);
        return res.status(500).json({
            success: false,
            message: `Error creating payment session: ${err.message}`
        });
    }
};

exports.verifyOrder = async (req, res) => {
    const {  success,orderId } = req.body;
    try {
        if (success === "true" || success === true) {
            const updateResult = await orderModel.findByIdAndUpdate(orderId, { payment: true });
            console.log("Update result:", updateResult);
            if (!updateResult) {
                throw new Error("Order not found or update failed");
            }
            return res.json({
                success: true,
                message: "Payment successful"
            });
        } else {
            const deleteResult = await orderModel.findByIdAndDelete(orderId);
            console.log("Delete result:", deleteResult);
            if (!deleteResult) {
                throw new Error("Order not found or delete failed");
            }
            return res.json({ success: false, message: "Payment failed" });
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Error verifying payment in orderController page: ${err.message}`
        });
    }
};



exports.userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return res.json({ success: true, data: orders });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: `Error fetching user orders: ${err.message}`
        });
    }
};


exports.getOrdersAdmin=async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        return res.json({success:true,data:orders});
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message: `Error fetching orders: ${err.message}`
        })
    }

}


exports.updateStatus=async(req,res)=>{
    try{
        const order=await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        return res.json({success:true,data:order});
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message: `Error fetching orders: ${err.message}`
        })
    }
}




