export declare enum BillingIntervalDto {
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}
export declare class CreatePlanDto {
    name: string;
    description?: string;
    priceCents: number;
    interval: BillingIntervalDto;
    active?: boolean;
}
