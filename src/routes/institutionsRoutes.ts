import express from 'express';
import { InstitutionService } from '../services/institutionsService';

const router = express.Router();

router.get('/institutions', InstitutionService.getAllInstitutions);
router.get('/institutions/:id', InstitutionService.getInstitutionById);
router.post('/institutions', InstitutionService.createInstitution);
router.put('/institutions/:id', InstitutionService.updateInstitution);
router.delete('/institutions/:id', InstitutionService.deleteInstitution);

export default router;
