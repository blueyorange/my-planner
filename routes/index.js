const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.render("index.njk", { currentUser: req.user });
});

module.exports = router;
