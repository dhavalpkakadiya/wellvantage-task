import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Gym } from '../../gyms/entities/gym.entity';

@Entity({ name: 'leads' })
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: true })
  lastName?: string;

  @Index()
  @Column({ length: 50, nullable: true })
  phone?: string;

  @Index()
  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ name: 'gender', length: 20, nullable: true })
  gender?: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth?: string;

  @Column({
    name: 'height',
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  height?: number;

  @Column({ name: 'height_unit', length: 10, default: 'cm' })
  heightUnit: string;

  @Column({
    name: 'weight',
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  weight?: number;

  @Column({ name: 'weight_unit', length: 10, default: 'kg' })
  weightUnit: string;

  @ManyToOne(() => Gym, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'gym_id' })
  gym: Gym;

  @Column({ name: 'gym_id' })
  gymId: string;

  // Preferences (stored as JSON for flexibility)
  @Column({ type: 'jsonb', nullable: true })
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
  @Column({
    name: 'inquiry_date',
    type: 'timestamp with time zone',
    nullable: true,
  })
  inquiryDate?: Date;

  @Column({ name: 'assigned_to', length: 150, nullable: true })
  assignedTo?: string; // could be admin id or name

  @Column({ name: 'interest_level', length: 50, nullable: true })
  interestLevel?: string;

  @Column({ name: 'follow_up_status', length: 50, nullable: true })
  followUpStatus?: string;

  @Column({ name: 'preferred_package', length: 150, nullable: true })
  preferredPackage?: string;

  @Column({ name: 'preferred_pt_package', length: 150, nullable: true })
  preferredPtPackage?: string;

  @Column({ name: 'how_they_heard', length: 150, nullable: true })
  howTheyHeard?: string;

  // Custom notes: array of { date, text, createdBy }
  @Column({ type: 'jsonb', nullable: true })
  customNotes?: Array<{ date: string; text: string; createdBy?: string }>;

  // audit
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date;
}
