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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvoicesService = class InvoicesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
        if (!user) {
            throw new common_1.NotFoundException("Utilizador não encontrado");
        }
        const subscription = await this.prisma.subscription.findUnique({
            where: { id: dto.subscriptionId },
        });
        if (!subscription) {
            throw new common_1.NotFoundException("Subscrição não encontrada");
        }
        return this.prisma.invoice.create({
            data: {
                userId: dto.userId,
                subscriptionId: dto.subscriptionId,
                amountCents: dto.amountCents,
                currency: dto.currency ?? "EUR",
                status: dto.status ?? undefined,
            },
            include: { user: true, subscription: true },
        });
    }
    findAll() {
        return this.prisma.invoice.findMany({
            include: { user: true, subscription: true },
            orderBy: { issuedAt: "desc" },
        });
    }
    async findOne(id) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: { user: true, subscription: true },
        });
        if (!invoice) {
            throw new common_1.NotFoundException("Fatura não encontrada");
        }
        return invoice;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.invoice.update({
            where: { id },
            data: {
                userId: dto.userId ?? undefined,
                subscriptionId: dto.subscriptionId ?? undefined,
                amountCents: dto.amountCents ?? undefined,
                currency: dto.currency ?? undefined,
                status: dto.status ?? undefined,
            },
            include: { user: true, subscription: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.invoice.delete({ where: { id } });
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map