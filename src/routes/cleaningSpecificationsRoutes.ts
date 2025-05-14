import express from 'express';
import {
    getCleaningSpecifications,
    createCleaningSpecification,
    updateCleaningSpecification,
    deleteCleaningSpecification
} from '../services/cleaningSpecificationsService';

const router = express.Router();

router.get('/cleaning-specifications', getCleaningSpecifications);
router.post('/cleaning-specifications', createCleaningSpecification);
router.put('/cleaning-specifications/:id', updateCleaningSpecification);
router.delete('/cleaning-specifications/:id', deleteCleaningSpecification);

export default router;
