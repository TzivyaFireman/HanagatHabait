import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAllInstitutions = async () => {
    const institutions = await prisma.institution.findMany();
    return institutions;
};

export const findInstitutionById = async (id: string) => {
    return await prisma.institution.findUnique({
        where: { id },
        include: {
            cleaningContact: true,
            financeContact: true
        }
    });
};

export const createInstitutionInDb = async (data: {
    name: string;
    address: string;
    cleaningContact?: { name: string; phone: string; email: string };
    accountingContact?: { name: string; phone: string; email: string };
    cleaningSpec?: object;
}) => {
    return await prisma.institution.create({
        data: {
            name: data.name,
            address: data.address,
            cleaningContact: data.cleaningContact
                ? { create: data.cleaningContact }
                : undefined,
            financeContact: data.accountingContact
                ? { create: data.accountingContact }
                : undefined
        },
        include: {
            cleaningContact: true,
            financeContact: true
        }
    });
};

export const updateInstitutionInDb = async (
    id: string,
    data: {
        name?: string;
        address?: string;
        cleaningContact?: { name: string; phone: string; email: string };
        accountingContact?: { name: string; phone: string; email: string };
        cleaningSpec?: object;
    }
) => {
    return await prisma.institution.update({
        where: { id },
        data: {
            name: data.name,
            address: data.address,
            cleaningContact: data.cleaningContact
                ? {
                      update: data.cleaningContact
                  }
                : undefined,
            financeContact: data.accountingContact
                ? {
                      update: data.accountingContact
                  }
                : undefined
        },
        include: {
            cleaningContact: true,
            financeContact: true
        }
    });
};

export const deleteInstitutionInDb = async (id: string) => {
    return await prisma.institution.delete({
        where: { id }
    });
};