import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddOrganizationUserDto } from "./dto/organization-user.dto";

@Injectable()
export class OrganizationUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async add(dto: AddOrganizationUserDto) {
    const org = await this.prisma.organization.findUnique({ where: { id: dto.organizationId } });
    if (!org) {
      throw new NotFoundException("Organização não encontrada");
    }

    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException("Utilizador não encontrado");
    }

    const subscription = await this.prisma.subscription.findFirst({
      where: {
        organizationId: dto.organizationId,
        status: { in: ["ACTIVE", "TRIALING"] },
      },
      include: { plan: true },
    });

    if (!subscription) {
      throw new BadRequestException("Sem subscrição ativa para adicionar membros");
    }

    const memberCount = await this.prisma.organizationUser.count({
      where: { organizationId: dto.organizationId },
    });

    if (memberCount >= subscription.plan.maxUsers) {
      throw new BadRequestException("Limite de utilizadores do plano atingido");
    }

    return this.prisma.organizationUser.create({
      data: {
        organizationId: dto.organizationId,
        userId: dto.userId,
        role: dto.role,
      },
      include: { user: true, organization: true },
    });
  }

  listByOrganization(organizationId: string) {
    return this.prisma.organizationUser.findMany({
      where: { organizationId },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async remove(id: string) {
    const membership = await this.prisma.organizationUser.findUnique({ where: { id } });
    if (!membership) {
      throw new NotFoundException("Associação não encontrada");
    }
    return this.prisma.organizationUser.delete({ where: { id } });
  }
}
