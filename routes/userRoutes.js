const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getUser,
  toggleFavorite,
  addToPlan
} = require("../controllers/userController");

router.get("/", auth, getUser);
router.post("/favorite", auth, toggleFavorite);
router.post("/plan", auth, addToPlan);
const { removeFromPlan } = require("../controllers/userController");

router.post("/plan/remove", auth, removeFromPlan);

module.exports = router;
