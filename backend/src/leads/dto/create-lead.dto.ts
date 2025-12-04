import {
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsObject,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

class NoteDto {
  @IsDateString()
  date: string;

  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}

export class CreateLeadDto {
  @IsOptional()
  @IsUUID()
  gymId?: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  heightUnit?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  weightUnit?: string;

  // Preferences as object
  @IsOptional()
  @IsObject()
  preferences?: {
    activityLevel?: string;
    wellnessGoals?: string;
    primaryFitnessFocus?: string;
    preferredGymTime?: string;
    preferredWorkoutIntensity?: string;
    medicalConcerns?: string;
    previousGymExperience?: string;
  };

  // Status
  @IsOptional()
  @IsDateString()
  inquiryDate?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  interestLevel?: string;

  @IsOptional()
  @IsString()
  followUpStatus?: string;

  @IsOptional()
  @IsString()
  preferredPackage?: string;

  @IsOptional()
  @IsString()
  preferredPtPackage?: string;

  @IsOptional()
  @IsString()
  howTheyHeard?: string;

  // Notes
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NoteDto)
  customNotes?: NoteDto[];
}
