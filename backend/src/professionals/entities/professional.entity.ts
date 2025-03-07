export class ProfessionalEntity {
  id: string;
  userId: string;
  experience: string;
  skills: string[];
  rating: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<ProfessionalEntity>) {
    Object.assign(this, partial);
  }
}
