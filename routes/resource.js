const express = require('express');
const router = express.Router();
const Resource = require('../model/resource'); // Import resource model

router.post('/', async (req, res) => {
  try {
    const { name, category, requirements, priority, area, city, state } = req.body;

    const newResource = new Resource({
      name,
      category,
      requirements,
      priority,
      area,
      city,
      state
    });

    await newResource.save();

    res.json({
      success: true,
      message: 'Resource request submitted successfully!',
      resource: newResource
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
