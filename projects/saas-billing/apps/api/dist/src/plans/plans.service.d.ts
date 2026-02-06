import { PrismaService } from "../prisma/prisma.service";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { UpdatePlanDto } from "./dto/update-plan.dto";
export declare class PlansService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePlanDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, dto: UpdatePlanDto): any;
    remove(id: string): any;
}
