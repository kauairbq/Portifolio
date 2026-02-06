import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubscriptionDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException("Utilizador não encontrado");
    }

    const plan = await this.prisma.plan.findUnique({ where: { id: dto.planId } });
    if (!plan) {
      throw new NotFoundException("Plano não encontrado");
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

  async findOne(id: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
      include: { user: true, plan: true },
    });

    if (!subscription) {
      throw new NotFoundException("Subscrição não encontrada");
    }

    return subscription;
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
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

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subscription.delete({ where: { id } });
  }
}
