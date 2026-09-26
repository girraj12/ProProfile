import { Router } from 'express';
import { getMyProfile, getPublicProfile, updateMyProfile } from '../controllers/profileController.js';
import { auth } from '../middleware/auth.js';
const router = Router();
router.get('/public/:username', getPublicProfile); 
router.get('/me', auth, getMyProfile); 
router.put('/me', auth, updateMyProfile);
export default router;
