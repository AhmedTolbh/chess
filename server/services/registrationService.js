const { google } = require('googleapis');
const path = require('path');

class RegistrationService {
    constructor() {
        this.sheets = null;
        this.spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
        this._init();
    }

    async _init() {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: path.join(__dirname, '..', 'service-account.json'),
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            const authClient = await auth.getClient();
            this.sheets = google.sheets({ version: 'v4', auth: authClient });
            console.log('✅ Google Sheets service initialized for registrations');

            // Ensure the header row exists
            await this._ensureHeaders();
        } catch (error) {
            console.error('❌ Failed to initialize Google Sheets:', error.message);
        }
    }

    async _ensureHeaders() {
        if (!this.sheets || !this.spreadsheetId) return;

        try {
            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Sheet1!A1:J1',
            });

            if (!response.data.values || response.data.values.length === 0) {
                await this.sheets.spreadsheets.values.update({
                    spreadsheetId: this.spreadsheetId,
                    range: 'Sheet1!A1:J1',
                    valueInputOption: 'RAW',
                    requestBody: {
                        values: [[
                            'Timestamp',
                            'Child Name',
                            'Age',
                            'Chess Level',
                            'Preferred Plan',
                            'Parent Name',
                            'Phone',
                            'Country',
                            'Notes',
                            'Source'
                        ]]
                    }
                });
                console.log('✅ Header row created in spreadsheet');
            }
        } catch (error) {
            console.error('⚠️ Could not ensure headers:', error.message);
        }
    }

    async addRegistration(data) {
        if (!this.sheets) {
            throw new Error('Google Sheets service not initialized');
        }

        if (!this.spreadsheetId) {
            throw new Error('GOOGLE_SPREADSHEET_ID not configured in .env');
        }

        const {
            childName,
            age,
            level,
            plan,
            parentName,
            phone,
            countryCode,
            country,
            notes
        } = data;

        const timestamp = new Date().toISOString();
        const fullPhone = `+${countryCode}${phone}`;

        const row = [
            timestamp,
            childName,
            age,
            level,
            plan,
            parentName,
            fullPhone,
            country || '',
            notes || '',
            'Website Registration'
        ];

        try {
            await this.sheets.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: 'Sheet1!A:J',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                requestBody: {
                    values: [row]
                }
            });

            return { success: true, message: 'Registration saved successfully' };
        } catch (error) {
            console.error('❌ Failed to save registration:', error.message);
            throw new Error('Failed to save registration to spreadsheet');
        }
    }
}

module.exports = new RegistrationService();
