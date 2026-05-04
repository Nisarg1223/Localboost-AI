import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Twilio sandbox WhatsApp number (stays the same for all sandbox accounts)
const FROM = process.env.TWILIO_WHATSAPP_FROM || "whatsapp:+14155238886";

// ─── Send a WhatsApp message ───────────────────────────────────────────────────
const sendWhatsAppMessage = async (toPhone, messageBody) => {
  // Normalize phone — strip spaces, ensure + prefix, add whatsapp: prefix
  const normalizedPhone = toPhone.replace(/\s+/g, "");
  const to = normalizedPhone.startsWith("whatsapp:")
    ? normalizedPhone
    : `whatsapp:${normalizedPhone.startsWith("+") ? normalizedPhone : "+" + normalizedPhone}`;

  try {
    const message = await client.messages.create({
      from: FROM,
      to,
      body: messageBody,
    });

    console.log(`[Twilio] Message sent. SID: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (err) {
    console.error("[Twilio Error]:", err.message);

    // Twilio error codes for better debugging
    if (err.code === 63007) throw new Error("WhatsApp number not in sandbox. Ask user to join first.");
    if (err.code === 21211) throw new Error("Invalid phone number format.");
    if (err.code === 20003) throw new Error("Twilio auth failed. Check your credentials.");

    throw new Error(err.message);
  }
};

export { sendWhatsAppMessage };
