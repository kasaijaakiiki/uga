import express, { Request, Response } from "express";
import asyncMiddleware from "express-async-handler";
import { HomeController } from "../controllers/homeController";
const router = express.Router();

router.get(
    "/home/get_region", asyncMiddleware(async (req: Request, res: Response) => {
        await HomeController.GetMainRegion(req, res);
    })
);
router.get(
    "/home/get_region/:regionName", asyncMiddleware(async (req: Request, res: Response) => {
        await HomeController.GetMainRegionByRegionName(req, res);
    })
);

export default router;