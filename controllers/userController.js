const User = require("../models/User");

// GET USER DATA
exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// TOGGLE FAVORITE
exports.toggleFavorite = async (req, res) => {
  const { exercise } = req.body;

  const user = await User.findById(req.user.id);

  const exists = user.favorites.find(e => e.id === exercise.id);

  if (exists) {
    user.favorites = user.favorites.filter(e => e.id !== exercise.id);
  } else {
    user.favorites.push(exercise);
  }

  await user.save();

  res.json(user.favorites);
};

// ADD TO PLAN
exports.addToPlan = async (req, res) => {
  const { day, exercise } = req.body;

  const user = await User.findById(req.user.id);

  if (!user.plan[day]) {
    user.plan[day] = [];
  }

  user.plan[day].push(exercise);

  await user.save();

  res.json(user.plan);
};
// REMOVE EXERCISE FROM PLAN
exports.removeFromPlan = async (req, res) => {
  const { day, index } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user.plan[day]) {
      return res.json(user.plan);
    }

    // ✅ ensure index is number
    const i = Number(index);

    // ❌ prevent crash
    if (i < 0 || i >= user.plan[day].length) {
      return res.json(user.plan);
    }

    // ✅ remove safely
    user.plan[day].splice(i, 1);

    // 🔥 IMPORTANT (force mongoose update)
    user.markModified("plan");

    await user.save();

    res.json(user.plan);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};