require('dotenv').config();
const { createMeeting } = require('./services/meetService');

const runTest = async () => {
    console.log('Testing Google Meet Creation...');
    console.log('Time:', new Date().toISOString());

    const startTime = new Date(Date.now() + 3600000).toISOString(); // 1 hour from now
    const endTime = new Date(Date.now() + 7200000).toISOString();   // 2 hours from now

    try {
        const link = await createMeeting('Test Meeting from AI Agent', startTime, endTime);
        console.log('---------------------------------------------------');
        console.log('RESULT:', link);
        console.log('---------------------------------------------------');

        if (link.includes('meet.google.com') && !link.includes('mock') && !link.includes('fallback')) {
            console.log('✅ SUCCESS: Real Google Meet link generated!');
        } else {
            console.log('⚠️  WARNING: Mock or Fallback link generated. Permissions might be missing.');
        }

    } catch (error) {
        console.error('❌ FATAL ERROR:', error);
    }
};

runTest();
