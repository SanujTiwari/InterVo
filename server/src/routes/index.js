import { Router } from 'express';
import healthRouter from './health.js';

const router = Router();

// Mount route modules
router.use('/health', healthRouter);

// Future routes will be added here:
// router.use('/auth', authRouter);
// router.use('/users', userRouter);
// router.use('/resume', resumeRouter);
// router.use('/roadmap', roadmapRouter);
// router.use('/coding', codingRouter);
// router.use('/interview', interviewRouter);

export default router;
