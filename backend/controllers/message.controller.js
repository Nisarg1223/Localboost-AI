import { generateWhatsAppPost } from "../services/seo.service.js";
import { sendWhatsAppMessage } from "../services/twilio.service.js";

// ─── POST /api/whatsapp/send ───────────────────────────────────────────────────
// Generates AI post via Gemini and sends it straight to user's WhatsApp
const sendWhatsAppPost = async (req, res) => {
  const { businessName, location, category, phone } = req.body;

  // Basic field check
  if (!businessName || !location || !category || !phone) {
    return res.status(400).json({
      success: false,
      message: "businessName, location, category and phone are all required",
    });
  }

  try {
    // Step 1 — Generate post with Gemini
    console.log(`[WhatsApp] Generating post for ${businessName}...`);
    const post = await generateWhatsAppPost({ businessName, location, category });

    // Step 2 — Send via Twilio to user's WhatsApp
    console.log(`[WhatsApp] Sending to ${phone}...`);
    await sendWhatsAppMessage(phone, post);

    return res.status(200).json({
      success: true,
      message: "Post sent to WhatsApp successfully!",
      preview: post,        // Return the post so frontend can show it
    });

  } catch (err) {
    console.error("[WhatsApp Controller Error]:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to send WhatsApp message",
    });
  }
};

// ─── POST /api/whatsapp/preview ────────────────────────────────────────────────
// Just generates and returns the post — no WhatsApp send
// Useful for showing a preview before the user confirms sending
const previewWhatsAppPost = async (req, res) => {
  const { businessName, location, category } = req.body;

  if (!businessName || !location || !category) {
    return res.status(400).json({
      success: false,
      message: "businessName, location and category are required",
    });
  }

  try {
    const post = await generateWhatsAppPost({ businessName, location, category });

    return res.status(200).json({
      success: true,
      preview: post,
    });

  } catch (err) {
    console.error("[WhatsApp Preview Error]:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to generate post preview",
    });
  }
};

export  { sendWhatsAppPost, previewWhatsAppPost };
