const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let name = "";
    if (req.session !== undefined && req.session.user !== undefined) name = req.session.user.name;

    res.render('home', {name: name})
});

module.exports = router;
