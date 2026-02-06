import { PrismaService } from "../prisma/prisma.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
export declare class InvoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInvoiceDto): Promise<any>;
    findAll(): any;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateInvoiceDto): Promise<any>;
    remove(id: string): Promise<any>;
}
