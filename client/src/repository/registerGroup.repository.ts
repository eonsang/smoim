import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { CommonAttachmentRepository } from "@/repository/commonAttachment.repository";
import { Type } from "class-transformer";

export class RegisterGroupRepository {
  date: [Date | null, Date | null];

  @IsString()
  information: string;

  @IsBoolean()
  isApproval: boolean;

  @IsNumber()
  maxUser: number;

  @IsNumber()
  minUser: number;

  @IsBoolean()
  isOpened: boolean;

  @IsString()
  notice: string;

  @IsString()
  subTitle: string;

  @IsString()
  title: string;

  @IsString()
  thumbnail: string;

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => CommonAttachmentRepository)
  attachments: CommonAttachmentRepository[];
}
