export declare enum SubscriptionStatusDto {
    ACTIVE = "ACTIVE",
    PAST_DUE = "PAST_DUE",
    CANCELED = "CANCELED",
    TRIALING = "TRIALING"
}
export declare class CreateSubscriptionDto {
    userId: string;
    planId: string;
    status?: SubscriptionStatusDto;
}
