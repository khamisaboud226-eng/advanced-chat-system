const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user");
const router = express.Router();

router.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashed,
        avatar: req.body.avatar || ""
    });
    await user.save();
    res.json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user._id, username: user.username }, "secretkey");
    res.json({ token, username: user.username, avatar: user.avatar });
});

module.exports = router;
