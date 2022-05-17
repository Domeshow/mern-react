const express = require("express");
const goalController = require("../controllers/goalController");
const router = express.Router();

router.route('/').get(goalController.getGoals).post(goalController.addGoal)
router.route('/:id').put(goalController.deleteGoal).delete(goalController.deleteGoal)

module.exports = router;