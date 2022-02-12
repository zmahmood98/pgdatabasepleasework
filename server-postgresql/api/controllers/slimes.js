const express = require('express');
const router = express.Router();

const Slime = require('../models/slime')

// slimes index route
router.get('/', async (req, res) => {
    try {
        const slimes = await Slime.all
        res.json({slimes})
    } catch(err) {
        res.status(500).json({err})
    }
})

// slimes show route
router.get('/:id', async (req, res) => {
    try {
        const slime = await Slime.findById(parseInt(req.params.id))
        res.json(slime)
    } catch(err) {
        res.status(404).json({err})
    }
})

// Create slime route
router.post('/', async (req, res) => {
    try {
        const slime = await Slime.create(req.body.name, req.body.rating)
        res.json(slime)
    } catch(err) {
        res.status(404).json({err})
    }
})

// slime update route
router.patch('/:id', async (req, res) => {
    try {
        const slime = await Slime.findById(parseInt(req.params.id))
        const updatedSlime = await slime.update(req.body.name, req.body.rating)
        res.json({slime: updatedSlime})
    } catch(err) {
        res.status(500).json({err})
    }
})

// delete slime route
router.delete('/:id', async (req, res) => {
    try {
        const slime = await Slime.findById(parseInt(req.params.id))
        await slime.destroy()
        res.status(204).json('Slime deleted')
    } catch(err) {
        res.status(500).json({err})
    }
})


module.exports = router;
