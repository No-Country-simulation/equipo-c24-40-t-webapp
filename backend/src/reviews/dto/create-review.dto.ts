import { Review } from '@prisma/client';
export type CreateReviewDto = Omit<Review, 'id' | 'createdAt' | 'updatedAt'>;
