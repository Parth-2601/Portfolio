export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }

    try {
        const { name, email, message } = req.body;

        console.log("Received Data:", { name, email, message });

        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!slackWebhookUrl) {
            console.error("Slack Webhook URL is missing");
            return res.status(500).json({ success: false, error: "Slack webhook URL is missing" });
        }

        console.log("Slack Webhook URL:", slackWebhookUrl); // Debugging

        const slackMessage = {
            text: `📩 *New Contact Form Submission*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`
        };

        console.log("Sending to Slack:", slackMessage); // Debugging

        const response = await fetch(slackWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slackMessage),
        });

        console.log("Slack Response Status:", response.status); // Debugging

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            const errorText = await response.text();
            console.error("Slack API Error:", errorText); // Debugging
            return res.status(500).json({ success: false, error: "Failed to send message to Slack" });
        }
    } catch (error) {
        console.error("Server Error:", error.message); // Debugging
        return res.status(500).json({ success: false, error: error.message });
    }
}