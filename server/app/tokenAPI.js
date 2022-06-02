
const express = require('express');
const router = express.Router();

router.get("", (req, res) =>{
    res.status(200).json({
        loggedUser: req.loggedUser,
        success: true,
    })
})

module.exports = router