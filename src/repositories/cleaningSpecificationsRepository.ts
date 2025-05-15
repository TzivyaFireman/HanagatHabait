import { PrismaClient, Day } from "@prisma/client";

const prisma = new PrismaClient();

export const findCleaningSpecifications = async (institutionId?: string) => {
    return await prisma.cleaningSpecification.findMany({
        where: institutionId ? { institutionId } : {},
        include: {
            assignedEmployees: true,
            institution: true
        }
    });
};

export const createCleaningSpecificationInDb = async (data: {
    task_id: string; // יכנס לשדה id
    day_of_week: Day;
    institution_id: string;
    assigned_employees?: string[];
    completed: boolean;
    performance_quality: string;
    notes?: string;
}) => {
    return await prisma.cleaningSpecification.create({
        data: {
            id: data.task_id, // שים לב כאן
            dayOfWeek: data.day_of_week,
            institution: { connect: { id: data.institution_id } },
            assignedEmployees: data.assigned_employees
                ? {
                      connect: data.assigned_employees.map((id) => ({ id }))
                  }
                : undefined,
            completed: data.completed,
            performanceQuality: data.performance_quality,
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
        day_of_week?: Day;
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
            id: data.task_id,
            dayOfWeek: data.day_of_week,
            institution: data.institution_id
                ? { connect: { id: data.institution_id } }
                : undefined,
            assignedEmployees: data.assigned_employees
                ? {
                      set: data.assigned_employees.map((id) => ({ id }))
                  }
                : undefined,
            completed: data.completed,
            performanceQuality: data.performance_quality,
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
