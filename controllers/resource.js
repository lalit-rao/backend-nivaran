// controllers/resource.js
const Resource = require('../model/resource');

exports.createResource = async (req, res) => {
    const { name, category, requirements, priority, area, city, state } = req.body;

    if (!name || !category || !priority || !city || !state) {
        return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const newResource = new Resource({
        name,
        category,
        requirements,
        priority,
        area,
        city,
        state
    });

    try {
        await newResource.save();
        res.json({ success: true, message: 'Resource created successfully', resource: newResource });
    } catch (error) {
        res.status(500).json({ error: 'Error saving resource', details: error });
    }
};
