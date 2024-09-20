import express from 'express';
import pingHandler from '../handlers/ping';

const router = express.Router();
router.get('/', pingHandler);

export default router;
