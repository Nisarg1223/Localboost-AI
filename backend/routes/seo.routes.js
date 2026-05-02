import {Router} from "express";
import { generateSEO } from "../controllers/seo.controller.js";
const seoRouter = Router();
seoRouter.post("/",generateSEO);
export default seoRouter;
