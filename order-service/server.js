const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`));

const OrderSchema = new mongoose.Schema({
    productId: String,
    quantity: Number,
    status: String,
});

const Order = mongoose.model("Order", OrderSchema);

app.post("/order", async(req, res) => {
    const productResponse = await axios.get(`http://localhost:5000/products/${productId}`);

    if (!productResponse.data) return res.status(404).send("Product not found");

    const order = new order({productId, quantity, status:"Pending"});
    await order.save();
    res.send(order);
});

app.listen(6000, () => console.log("Order Service running on port 6000"));
