const orderModel = require("../models/order_model");
const userModel = require("../models/user_schema");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Validate input data
        if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const neworder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map(item => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));

        // Add Delivery Charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`
        });

        return res.json({
            success: true,
            session_url: session.url
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}


exports.verifyPayment = async (req, res) => {
    try {
        const { orderId,success } = req.body;

        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { status: "Paid" });
            return res.json({
                 success: true,
                 message: "Payment Successful"
                }
            );
        }
        else{
            return res.json({ success: false, message: "Payment Failed" });
        }
    }
    catch(err){
        return res.status(400).json({ success: false, message: err.message });
    }
} 



exports.userOrders = async (req, res) => {
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        return res.json({success:true,data:orders});
    }
    catch(err){
        return res.status(400).json({ success: false, message: err.message });
    }
}
