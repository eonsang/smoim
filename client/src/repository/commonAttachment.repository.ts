import { IsMimeType, IsNumber, IsOptional, IsString } from "class-validator";

export class CommonAttachmentRepository {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  key: string;

  @IsMimeType()
  type: string;

  @IsString()
  originalName: string;
}
