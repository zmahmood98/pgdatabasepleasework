const express = require('express');
const router = express.Router();

const Title = require('../models/title')

// titles show route
router.get('/:id', async (req, res) => {
    try {
        const title = await Title.findById(parseInt(req.params.id))
        res.json(title)
    } catch (err) {
        res.status(400).send({err})
    }
})

// titles slimes route
router.get('/:id/slimes', async (req, res) => {
    try {
        const title = await Title.findById(parseInt(req.params.id))
        console.log(title)
        const slimes = await title.slimes
        console.log(slimes)
        res.json(slimes)
    } catch(err) {
        res.status(404).send({err}) 
    }
})

module.exports = router;
