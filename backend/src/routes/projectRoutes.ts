import { Router } from 'express';
import { addProject, deleteProject, listProjects, updateProject } from '../controllers/projectController.js';
import { auth } from '../middleware/auth.js';
const router = Router(); router.use(auth);
router.get('/', listProjects); 
router.post('/', addProject); 
router.put('/:id', updateProject); 
router.delete('/:id', deleteProject);
export default router;
