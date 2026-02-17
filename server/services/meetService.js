const { google } = require('googleapis');

// Placeholder for Google Calendar API setup
// The user will need to provide their Service Account credentials in a .json file
// and set the GOOGLE_APPLICATION_CREDENTIALS environment variable.

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const getAuthClient = async () => {
    const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const apiKey = process.env.GOOGLE_API_KEY;

    // 1. Try Service Account (Best for server-side)
    if (keyFile && require('fs').existsSync(keyFile)) {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile,
                scopes: SCOPES,
            });
            return await auth.getClient();
        } catch (error) {
            console.error('Service Account Auth Error:', error.message);
        }
    }

    // 2. Try API Key (As requested by user)
    if (apiKey) {
        console.log('Using provided Google API Key');
        return apiKey; // Return key string directly for 'auth' property
    }

    // Fallback
    console.log('No valid Google Credentials found - using Mock mode');
    return null;
};

/**
 * Creates a Google Meet event.
 * @param {string} title - The title of the class.
 * @param {string} startTime - ISO string of start time.
 * @param {string} endTime - ISO string of end time.
 * @param {string[]} attendees - List of email addresses.
 */
const createMeeting = async (title, startTime, endTime, attendees = []) => {
    try {
        const auth = await getAuthClient();

        if (auth) {
            // Check if auth is an object (Service Account) or string (API Key)
            const calendar = google.calendar({
                version: 'v3',
                auth: typeof auth === 'string' ? auth : auth
            });

            const event = {
                summary: title,
                description: 'Chess Class - Pioneers Academy',
                start: { dateTime: startTime, timeZone: 'UTC' },
                end: { dateTime: endTime, timeZone: 'UTC' },
                attendees: attendees.map(email => ({ email })),
                conferenceData: {
                    createRequest: {
                        requestId: title + Date.now(),
                        conferenceSolutionKey: { type: 'hangoutsMeet' },
                    },
                },
            };

            // Using 'primary' calendar usually requires OAuth/Service Account. 
            // With API Key, this might fail unless specific calendar ID is public/shared, 
            // but we will attempt it as requested.
            const res = await calendar.events.insert({
                calendarId: 'primary',
                resource: event,
                conferenceDataVersion: 1,
            });

            console.log('Real Meet Link Created:', res.data.hangoutLink);
            return res.data.hangoutLink;
        }

        // MOCK RESPONSE IF NO AUTH
        console.log(`[MOCK] Creating Google Meet for "${title}" from ${startTime} to ${endTime}`);
        return `https://meet.google.com/mock-link-${Date.now()}`;

    } catch (error) {
        console.error('Error creating meeting:', error);
        // Fallback to mock on error to keep app running
        return `https://meet.google.com/fallback-link-${Date.now()}`;
    }
};

module.exports = { createMeeting };
