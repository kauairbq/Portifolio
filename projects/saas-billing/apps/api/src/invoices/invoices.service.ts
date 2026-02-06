import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInvoiceDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException("Utilizador não encontrado");
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { id: dto.subscriptionId },
    });

    if (!subscription) {
      throw new NotFoundException("Subscrição não encontrada");
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

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { user: true, subscription: true },
    });

    if (!invoice) {
      throw new NotFoundException("Fatura não encontrada");
    }

    return invoice;
  }

  async update(id: string, dto: UpdateInvoiceDto) {
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

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.invoice.delete({ where: { id } });
  }
}
