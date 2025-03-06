const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`));

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

app.post("/register", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({email: req.body.email, password: hashedPassword});
    await user.save();
    res.send("User registered");
});

app.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = jwt.sign({email: user.email}, "secret");
        return res.json({token});
    }
    res.status(401).send("Invalid credentials");
});

app.listen(4000, () => console.log("Auth Service running on port 4000"));



