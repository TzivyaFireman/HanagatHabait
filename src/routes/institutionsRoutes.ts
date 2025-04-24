import express from 'express';
import { 
    getAllInstitutions, 
    getInstitutionById, 
    createInstitution, 
    updateInstitution, 
    deleteInstitution 
} from '../services/institutionsService';

const router = express.Router();

router.get('/institutions', getAllInstitutions);
router.get('/institutions/:id', getInstitutionById);
router.post('/institutions', createInstitution);
router.put('/institutions/:id', updateInstitution);
router.delete('/institutions/:id', deleteInstitution);

export default router;