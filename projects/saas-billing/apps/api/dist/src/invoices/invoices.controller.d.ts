import { InvoicesService } from "./invoices.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    create(dto: CreateInvoiceDto): Promise<any>;
    findAll(): any;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateInvoiceDto): Promise<any>;
    remove(id: string): Promise<any>;
}
