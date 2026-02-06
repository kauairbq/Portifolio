import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(dto: CreateSubscriptionDto): Promise<any>;
    findAll(): any;
    findOne(id: string): Promise<any>;
    update(id: string, dto: UpdateSubscriptionDto): Promise<any>;
    remove(id: string): Promise<any>;
}
