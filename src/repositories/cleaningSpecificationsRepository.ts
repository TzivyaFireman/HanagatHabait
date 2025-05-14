import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findCleaningSpecifications = async (institutionId?: string) => {
    return await prisma.cleaningSpecification.findMany({
        where: institutionId ? { institution_id: institutionId } : {},
        include: {
            assignedEmployees: true,
            institution: true
        }
    });
};

export const createCleaningSpecificationInDb = async (data: {
    task_id: string;
    day_of_week: string;
    institution_id: string;
    assigned_employees?: string[];
    completed: boolean;
    performance_quality: string;
    notes?: string;
}) => {
    return await prisma.cleaningSpecification.create({
        data: {
            task_id: data.task_id,
            day_of_week: data.day_of_week,
            institution: { connect: { id: data.institution_id } },
            assignedEmployees: data.assigned_employees
                ? {
                      connect: data.assigned_employees.map((id) => ({ id }))
                  }
                : undefined,
            completed: data.completed,
            performance_quality: data.performance_quality,
            notes: data.notes
        },
        include: {
            assignedEmployees: true,
            institution: true
        }
    });
};

export const updateCleaningSpecificationInDb = async (
    id: string,
    data: {
        task_id?: string;
        day_of_week?: string;
        institution_id?: string;
        assigned_employees?: string[];
        completed?: boolean;
        performance_quality?: string;
        notes?: string;
    }
) => {
    return await prisma.cleaningSpecification.update({
        where: { id },
        data: {
            task_id: data.task_id,
            day_of_week: data.day_of_week,
            institution: data.institution_id
                ? { connect: { id: data.institution_id } }
                : undefined,
            assignedEmployees: data.assigned_employees
                ? {
                      set: data.assigned_employees.map((id) => ({ id }))
                  }
                : undefined,
            completed: data.completed,
            performance_quality: data.performance_quality,
            notes: data.notes
        },
        include: {
            assignedEmployees: true,
            institution: true
        }
    });
};

export const deleteCleaningSpecificationInDb = async (id: string) => {
    return await prisma.cleaningSpecification.delete({
        where: { id }
    });
};
