import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.id) {
      throw new UnauthorizedException("Autenticação necessária");
    }

    const orgIdHeader =
      request.headers["x-organization-id"] ?? request.headers["x-organization"];

    if (!orgIdHeader || Array.isArray(orgIdHeader)) {
      throw new ForbiddenException("Cabeçalho x-organization-id obrigatório");
    }

    const orgIdParam = request.params?.organizationId;
    const orgId = orgIdParam ?? orgIdHeader;

    if (orgIdParam && orgIdParam !== orgIdHeader) {
      throw new ForbiddenException("Organização do cabeçalho não corresponde ao parâmetro");
    }

    const membership = await this.prisma.organizationUser.findUnique({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId: orgId,
        },
      },
      include: { organization: true },
    });

    if (!membership) {
      throw new ForbiddenException("Utilizador sem acesso à organização");
    }

    request.organizationId = orgId;
    request.organizationRole = membership.role;

    return true;
  }
}
