export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    const { name, email, message } = await req.body;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
        return res.status(500).json({ success: false, error: "Slack webhook URL is missing" });
    }

    const slackMessage = {
        text: `📩 *New Contact Form Submission*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`
    };

    try {
        const response = await fetch(slackWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slackMessage),
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ success: false, error: "Failed to send message to Slack" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
