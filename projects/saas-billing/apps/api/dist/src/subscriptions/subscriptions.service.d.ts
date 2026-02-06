import { PrismaService } from "../prisma/prisma.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
export declare class SubscriptionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSubscriptionDto): Promise<any>;
    findAll(): any;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateSubscriptionDto): Promise<any>;
    remove(id: string): Promise<any>;
}
