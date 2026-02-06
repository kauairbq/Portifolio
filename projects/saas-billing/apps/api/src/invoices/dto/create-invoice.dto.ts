import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

export enum InvoiceStatusDto {
  DRAFT = "DRAFT",
  OPEN = "OPEN",
  PAID = "PAID",
  VOID = "VOID",
}

export class CreateInvoiceDto {
  @IsString()
  userId: string;

  @IsString()
  subscriptionId: string;

  @IsInt()
  @Min(0)
  amountCents: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsEnum(InvoiceStatusDto)
  status?: InvoiceStatusDto;
}
