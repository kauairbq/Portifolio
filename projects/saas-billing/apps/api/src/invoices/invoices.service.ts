import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInvoiceDto) {
    const organization = await this.prisma.organization.findUnique({
      where: { id: dto.organizationId },
    });
    if (!organization) {
      throw new NotFoundException("Organização não encontrada");
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { id: dto.subscriptionId },
    });
    if (!subscription) {
      throw new NotFoundException("Subscrição não encontrada");
    }

    return this.prisma.invoice.create({
      data: {
        organizationId: dto.organizationId,
        subscriptionId: dto.subscriptionId,
        amountCents: dto.amountCents,
        currency: dto.currency ?? undefined,
        status: dto.status ?? undefined,
        dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
      },
      include: { organization: true, subscription: true },
    });
  }

  findAll() {
    return this.prisma.invoice.findMany({
      include: { organization: true, subscription: true },
      orderBy: { issuedAt: "desc" },
    });
  }

  async findOne(id: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      include: { organization: true, subscription: true },
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
        organizationId: dto.organizationId ?? undefined,
        subscriptionId: dto.subscriptionId ?? undefined,
        amountCents: dto.amountCents ?? undefined,
        currency: dto.currency ?? undefined,
        status: dto.status ?? undefined,
        dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
        paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
      },
      include: { organization: true, subscription: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.invoice.delete({ where: { id } });
  }
}
