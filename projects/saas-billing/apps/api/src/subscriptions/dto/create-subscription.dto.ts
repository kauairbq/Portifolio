import { IsEnum, IsOptional, IsString } from "class-validator";

export enum SubscriptionStatusDto {
  ACTIVE = "ACTIVE",
  PAST_DUE = "PAST_DUE",
  CANCELED = "CANCELED",
  TRIALING = "TRIALING",
}

export class CreateSubscriptionDto {
  @IsString()
  userId: string;

  @IsString()
  planId: string;

  @IsOptional()
  @IsEnum(SubscriptionStatusDto)
  status?: SubscriptionStatusDto;
}
