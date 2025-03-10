import { Request, Response } from 'express';
import {
    findInstitutionById,
    findAllInstitutions,
    createInstitutionInDb,
    updateInstitutionInDb,
    deleteInstitutionInDb
} from '../repositories/institutionsRepository';

export const getAllInstitutions = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const institutions = await findAllInstitutions();
        res.status(200).json(institutions);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getInstitutionById = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const institution = await findInstitutionById(req.params.id);
        if (!institution) {
            return res.status(404).json({ message: 'Institution not found' });
        }
        res.status(200).json(institution);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createInstitution = async (req: Request, res: Response): Promise<void> => {
    const { name, address, cleaningContact, accountingContact, cleaningSpec } = req.body;

    try {
        const newInstitution = await createInstitutionInDb({
            name,
            address,
            cleaningContact: {
                name: cleaningContact.name,
                phone: cleaningContact.phone,
                email: cleaningContact.email
            },
            accountingContact: {
                name: accountingContact.name,
                phone: accountingContact.phone,
                email: accountingContact.email
            },
            cleaningSpec
        });
        res.status(201).json(newInstitution);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateInstitution = async (req: Request, res: Response): Promise<Response | void> => {
    const { name, address, cleaningContact, accountingContact, cleaningSpec } = req.body;

    try {
        const updatedInstitution = await updateInstitutionInDb(req.params.id, {
            name,
            address,
            cleaningContact: {
                name: cleaningContact.name,
                phone: cleaningContact.phone,
                email: cleaningContact.email
            },
            accountingContact: {
                name: accountingContact.name,
                phone: accountingContact.phone,
                email: accountingContact.email
            },
            cleaningSpec
        });

        if (!updatedInstitution) {
            return res.status(404).json({ message: 'Institution not found' });
        }

        res.status(200).json(updatedInstitution);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteInstitution = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const deletedInstitution = await deleteInstitutionInDb(req.params.id);
        if (!deletedInstitution) {
            return res.status(404).json({ message: 'Institution not found' });
        }
        res.status(200).json({ message: 'Institution deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
