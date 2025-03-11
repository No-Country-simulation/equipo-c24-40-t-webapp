export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  name: string;
  lastname: string;
  age: number;
  location?: string;
  createdAt: Date;
}
