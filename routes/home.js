const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("home.njk", { currentUser: req.user });
});

module.exports = router;
