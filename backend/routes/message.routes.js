import express from "express";
const messageRouter = express.Router();
import { sendWhatsAppPost, previewWhatsAppPost } from "../controllers/message.controller.js";

// POST /api/whatsapp/preview  → Generate post, return preview (no send)
messageRouter.post("/preview", previewWhatsAppPost);

// POST /api/whatsapp/send     → Generate post + send to WhatsApp
messageRouter.post("/send", sendWhatsAppPost);

export default messageRouter;
