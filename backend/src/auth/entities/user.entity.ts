export class UserEntity {
  id: string;
  name: string;
  email: string;
  location?: string;
  role: 'USER' | 'PROFESSIONAL';
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
