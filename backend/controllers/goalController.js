const Goal = require('../models/goalModel')
const expressHandler = require("express-async-handler")

const goalController = {
    // @desc Get goals
    // @route GET /api/goals
    // access Private
    getGoals : expressHandler(async (req, res) => {
        const goals = await Goal.find({user: req.user.id});
        res.status(200).json({status: 200, data: goals})
    }),

    // @desc Add goals
    // @route POST /api/goals
    // access Private
    addGoal : expressHandler(async (req, res) => {
        if (! req.body.text) {
            res.status(400)
            throw new Error("text cannot be empty")
        }

        const goal = {
            text: req.body.text,
            user: req.user.id
        }
        const result = await Goal.create(goal);
        res.status(201).json({status: 201, data: result})
    }),

    // @desc Update a goal
    // @route PUT /api/goals/:id
    // access Private
    updateGoal : expressHandler(async (req, res) => {
        const goal = await Goal.findOne({_id: req.params.id, user: req.user.id});
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
    }),

    // @desc Add goals
    // @route DELETE /api/goals/:id
    // access Private
    deleteGoal : expressHandler(async (req, res) => {
        const goal = await Goal.findOne({_id: req.params.id, user: req.user.id});
        if(! goal) {
            return res.json({
                status: 400,
                message: "Goal not found!"
            })
        }
        await goal.remove();
        res.status(200).json({status: 200, message: "Goal deleted"})
    })
}

module.exports = goalController;