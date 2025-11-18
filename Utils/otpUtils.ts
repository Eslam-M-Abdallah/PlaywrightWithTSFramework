import Mailosaur from "mailosaur";
import * as cheerio from "cheerio";

export default class OtpUtils {
    private apiKey: string;
    private serverId: string;

    constructor() {
        this.apiKey = process.env.MAILOSAUR_API_KEY ?? "";
        this.serverId = process.env.MAILOSAUR_SERVER_ID ?? "";

        if (!this.apiKey || !this.serverId) {
            throw new Error("❌ Mailosaur API key or Server ID is not set in environment variables.");
        }
    }

    /**
     * Fetches the latest 4-digit OTP sent to a Mailosaur test email.
     * @param testEmail The Mailosaur test email to receive OTP
     * @param timeout Optional timeout for waiting for the email (ms)
     * @returns The 4-digit OTP as string
     */
    public async getLatestOtp(testEmail: string, timeout = 30000): Promise<string> {
        const client = new Mailosaur(this.apiKey);

        // Clear old emails
        await client.messages.deleteAll(this.serverId);
        console.log("🗑️ Inbox cleared");

        // Get the latest message
        const message = await client.messages.get(
            this.serverId,
            { sentTo: testEmail },
            { timeout: 40000  }
        );

        const htmlBody = message.html?.body ?? "";
        const $ = cheerio.load(htmlBody);

        // Extract 4-digit OTP
        let otp: string | undefined;
        $('strong').each((i, el) => {
            const text = $(el).text().trim();
            if (/^\d{4}$/.test(text)) {
                otp = text;
                return false;
            }
        });

        if (!otp) throw new Error("❌ OTP not found in the email.");
        console.log(`✅ OTP found: ${otp}`);
        return otp;
    }

    /**
     * Splits a 4-digit OTP string into separate digit variables
     * @param otpCode The OTP string (e.g., "4729")
     * @returns Object with individual digits
     */
    public splitOtp(otpCode: string): { digit1: string; digit2: string; digit3: string; digit4: string } {
        if (!/^\d{4}$/.test(otpCode)) {
            throw new Error("❌ Invalid OTP format. Must be 4 digits.");
        }

        const [digit1, digit2, digit3, digit4] = otpCode.split("");
        return { digit1, digit2, digit3, digit4 };
    }
}
