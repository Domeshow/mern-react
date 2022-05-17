const goalController = {
    // @desc Get goals
    // @route GET /api/goals
    // access Private
    getGoals : (req, res) => {
        res.status(200).json({message: "Get goals"})
    },

    // @desc Add goals
    // @route POST /api/goals
    // access Private
    addGoal : (req, res) => {
        if (! req.body.title)
         throw new Error("Title cannot be empty")
        res.status(201).json({message: "Goal created"})
    },

    // @desc Update a goal
    // @route PUT /api/goals/:id
    // access Private
    updateGoal : (req, res) => {
        res.status(200).json({message: "Goal updated"})
    },

    // @desc Add goals
    // @route DELETE /api/goals/:id
    // access Private
    deleteGoal : (req, res) => {
        res.status(200).json({message: "Goal deleted"})
    }
}

module.exports = goalController;