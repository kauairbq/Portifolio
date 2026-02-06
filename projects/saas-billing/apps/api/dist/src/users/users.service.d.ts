import { PrismaService } from "../prisma/prisma.service";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): any;
}
