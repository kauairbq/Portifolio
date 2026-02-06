import { PlansService } from "./plans.service";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { UpdatePlanDto } from "./dto/update-plan.dto";
export declare class PlansController {
    private readonly plans;
    constructor(plans: PlansService);
    create(dto: CreatePlanDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, dto: UpdatePlanDto): any;
    remove(id: string): any;
}
