const express = require('express');
const router = express.Router();
const baseController = require("../controllers/baseController");
const Util = require('../utilities/index');

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Route to cause errors for testing
router.get("/cause-error", (req, res, next) => {
    next(new Error("Intentional 500 error"));
});

router.get("/cause-error-controller", baseController.causeError);

router.get("/cause-error-middleware", Util.causeError);

module.exports = router;



