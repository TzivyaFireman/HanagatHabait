import { Request, Response } from 'express';
import {
    findCleaningSpecifications,
    createCleaningSpecificationInDb,
    updateCleaningSpecificationInDb,
    deleteCleaningSpecificationInDb
} from '../repositories/cleaningSpecificationsRepository';

export const getCleaningSpecifications = async (req: Request, res: Response): Promise<void> => {
    try {
        const specifications = await findCleaningSpecifications(req.query.institution_id as string);
        res.status(200).json(specifications);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createCleaningSpecification = async (req: Request, res: Response): Promise<void> => {
    const {
        task_id,
        day_of_week,
        institution_id,
        assigned_employees,
        completed,
        performance_quality,
        notes
    } = req.body;

    try {
        const newSpec = await createCleaningSpecificationInDb({
            task_id,
            day_of_week,
            institution_id,
            assigned_employees,
            completed,
            performance_quality,
            notes
        });

        res.status(201).json(newSpec);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateCleaningSpecification = async (req: Request, res: Response): Promise<any> => {
    const {
        task_id,
        day_of_week,
        institution_id,
        assigned_employees,
        completed,
        performance_quality,
        notes
    } = req.body;

    try {
        const updated = await updateCleaningSpecificationInDb(req.params.id, {
            task_id,
            day_of_week,
            institution_id,
            assigned_employees,
            completed,
            performance_quality,
            notes
        });

        if (!updated) {
            return res.status(404).json({ message: 'Cleaning specification not found' });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteCleaningSpecification = async (req: Request, res: Response): Promise<any>=> {
    try {
        const deleted = await deleteCleaningSpecificationInDb(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Cleaning specification not found' });
        }

        res.status(200).json({ message: 'Cleaning specification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
