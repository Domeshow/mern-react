const Goal = require('../models/goalModel')

const goalController = {
    // @desc Get goals
    // @route GET /api/goals
    // access Private
    getGoals : async (req, res) => {
        const goals = await Goal.find();
        res.status(200).json({status: 200, data: goals})
    },

    // @desc Add goals
    // @route POST /api/goals
    // access Private
    addGoal : async (req, res) => {
        if (! req.body.text) {
            res.status(400)
            throw new Error("text cannot be empty")
        }

        const goal = {
            text: req.body.text
        }
        const result = await Goal.create(goal);
        res.status(201).json({status: 201, data: result})
    },

    // @desc Update a goal
    // @route PUT /api/goals/:id
    // access Private
    updateGoal : async (req, res) => {
        const goal = await Goal.findById({_id: req.params.id});
        if(! goal) {
            return res.json({
                status: 400,
                message: "Goal not found!"
            })
        }
        if (! req.body.text) {
            res.status(400)
            throw new Error("text cannot be empty")
        }

        await Goal.updateOne({_id: req.params.id}, {
            text: req.body.text
        })
        res.status(200).json({status: 200, message: "Goal updated"})
    },

    // @desc Add goals
    // @route DELETE /api/goals/:id
    // access Private
    deleteGoal : async (req, res) => {
        let goal = await Goal.findById({_id: req.params.id});
        if(! goal) {
            return res.json({
                status: 400,
                message: "Goal not found!"
            })
        }
        await goal.remove();
        res.status(200).json({status: 200, message: "Goal deleted"})
    }
}

module.exports = goalController;