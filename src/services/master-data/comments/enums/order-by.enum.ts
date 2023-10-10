export const OrderBy = {
  NAME: 'name',
  CREATEDAT: 'createdAt',
  UPDATEDAT: 'updatedAt',
  DELETEDAT: 'deletedAt',
};

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
