const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`)
);

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

const Product = mongoose.model("Product", ProductSchema);

app.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

app.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(5000, () => console.log("Product Service runnign on port 5000"));
