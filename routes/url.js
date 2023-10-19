import { Router } from "express";
const router = Router();
import { handleEntryUpdate, handleGenerateQrCode, handleGenerateURL, handleGetAnalytics } from "../controllers/url.js";


router.post("/url",handleGenerateURL);

router.get("/:shortID",handleEntryUpdate)

router.get("/url/analytics/:shortID",handleGetAnalytics)

router.post("/qr",handleGenerateQrCode)

export default router;