import { Router, type IRouter } from "express";
import healthRouter from "./health";
import githubRouter from "./github";
import wakatimeRouter from "./wakatime";
import umamiRouter from "./umami";
import smarttalkRouter from "./smarttalk";
import emailRouter from "./email";
import pushRouter from "./push";

const router: IRouter = Router();

router.use(healthRouter);
router.use(githubRouter);
router.use(wakatimeRouter);
router.use(umamiRouter);
router.use(smarttalkRouter);
router.use(emailRouter);
router.use(pushRouter);

export default router;
