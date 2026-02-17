const express = require('express');
const router = express.Router();
const registrationService = require('../services/registrationService');

// POST /api/registrations
router.post('/', async (req, res) => {
    try {
        const { childName, age, level, plan, parentName, phone, countryCode, country, notes } = req.body;

        // Validation
        const errors = [];
        if (!childName || childName.trim().length < 2) errors.push('Child name is required (min 2 characters)');
        if (!age || age < 5 || age > 18) errors.push('Age must be between 5 and 18');
        if (!level) errors.push('Chess level is required');
        if (!plan) errors.push('Preferred plan is required');
        if (!parentName || parentName.trim().length < 2) errors.push('Parent name is required (min 2 characters)');
        if (!phone || phone.trim().length < 6) errors.push('Valid phone number is required');
        if (!countryCode) errors.push('Country code is required');

        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        const result = await registrationService.addRegistration({
            childName: childName.trim(),
            age: parseInt(age),
            level,
            plan,
            parentName: parentName.trim(),
            phone: phone.trim(),
            countryCode,
            country: country || '',
            notes: notes ? notes.trim() : ''
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
