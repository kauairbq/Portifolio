export declare enum InvoiceStatusDto {
    DRAFT = "DRAFT",
    OPEN = "OPEN",
    PAID = "PAID",
    VOID = "VOID"
}
export declare class CreateInvoiceDto {
    userId: string;
    subscriptionId: string;
    amountCents: number;
    currency?: string;
    status?: InvoiceStatusDto;
}
