export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
  
    try {
      // ✅ Access the request body directly (Vercel automatically parses JSON)
      const { name, email, message } = req.body;
  
      console.log("Received Data:", { name, email, message });
  
      // ✅ Check if required fields are present
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }
  
      // ✅ Get the Slack webhook URL from environment variables
      const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (!slackWebhookUrl) {
        console.error("Slack Webhook URL is missing");
        return res.status(500).json({ success: false, error: "Slack webhook URL is missing" });
      }
  
      // ✅ Construct the Slack message
      const slackMessage = {
        text: `📩 *New Contact Form Submission*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* ${message}`,
      };
  
      console.log("Sending to Slack:", slackMessage);
  
      // ✅ Send the request to Slack
      const response = await fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackMessage),
      });
  
      console.log("Slack Response Status:", response.status);
  
      if (response.ok) {
        return res.status(200).json({ success: true });
      } else {
        const errorText = await response.text();
        console.error("Slack API Error:", errorText);
        return res.status(500).json({ success: false, error: "Failed to send message to Slack" });
      }
    } catch (error) {
      console.error("Server Error:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }