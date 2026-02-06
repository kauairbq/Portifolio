"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SubscriptionsService = class SubscriptionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!user) {
            throw new common_1.NotFoundException("Utilizador não encontrado");
        }
        const plan = await this.prisma.plan.findUnique({ where: { id: dto.planId } });
        if (!plan) {
            throw new common_1.NotFoundException("Plano não encontrado");
        }
        return this.prisma.subscription.create({
            data: {
                userId: dto.userId,
                planId: dto.planId,
                status: dto.status ?? undefined,
            },
            include: { user: true, plan: true },
        });
    }
    findAll() {
        return this.prisma.subscription.findMany({
            include: { user: true, plan: true },
            orderBy: { createdAt: "desc" },
        });
    }
    async findOne(id) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { id },
            include: { user: true, plan: true },
        });
        if (!subscription) {
            throw new common_1.NotFoundException("Subscrição não encontrada");
        }
        return subscription;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.subscription.update({
            where: { id },
            data: {
                userId: dto.userId ?? undefined,
                planId: dto.planId ?? undefined,
                status: dto.status ?? undefined,
            },
            include: { user: true, plan: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.subscription.delete({ where: { id } });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map