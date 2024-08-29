const { Router } = require("express")
const { convertFtoC, convertCtoF } = require("../controllers/Convert");
const { verifyToken } = require("../middleware/auth");
const router = Router();

router.get("/changetoC/:value", verifyToken, convertFtoC);
router.get("/changetoF/:value", verifyToken, convertCtoF);


module.exports = router