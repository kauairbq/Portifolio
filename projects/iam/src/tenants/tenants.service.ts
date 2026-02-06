import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTenantDto } from "./dto/create-tenant.dto";
import { InviteTenantUserDto } from "./dto/invite-tenant-user.dto";
import { AcceptInviteDto } from "./dto/accept-invite.dto";
import { UpdateTenantRoleDto } from "./dto/update-tenant-role.dto";
import { randomUUID } from "crypto";

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({ data: dto });
  }

  async invite(tenantId: string, dto: InviteTenantUserDto) {
    const token = randomUUID();
    return this.prisma.tenantInvite.create({
      data: {
        tenantId,
        email: dto.email,
        token,
      },
    });
  }

  async acceptInvite(dto: AcceptInviteDto) {
    const invite = await this.prisma.tenantInvite.findUnique({ where: { token: dto.token } });
    if (!invite) throw new NotFoundException("Convite invalido");

    const user = await this.prisma.user.findUnique({ where: { email: invite.email } });
    if (!user) throw new NotFoundException("Utilizador nao encontrado");

    await this.prisma.tenantUser.upsert({
      where: { tenantId_userId: { tenantId: invite.tenantId, userId: user.id } },
      update: {},
      create: { tenantId: invite.tenantId, userId: user.id, role: "MEMBER" },
    });

    await this.prisma.tenantInvite.update({
      where: { id: invite.id },
      data: { status: "ACCEPTED", acceptedAt: new Date() },
    });

    return { ok: true };
  }

  listUsers(tenantId: string) {
    return this.prisma.tenantUser.findMany({
      where: { tenantId },
      include: { user: true },
    });
  }

  async updateRole(tenantId: string, userId: string, dto: UpdateTenantRoleDto) {
    const membership = await this.prisma.tenantUser.findUnique({
      where: { tenantId_userId: { tenantId, userId } },
    });
    if (!membership) throw new NotFoundException("Utilizador nao pertence ao tenant");

    return this.prisma.tenantUser.update({
      where: { tenantId_userId: { tenantId, userId } },
      data: { role: dto.role as any },
    });
  }
}
