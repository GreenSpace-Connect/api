export const OrderBy = {
  FULLNAME: 'fullname',
  CREATEDAT: 'createdAt',
  UPDATEDAT: 'updatedAt',
  DELETEDAT: 'deletedAt',
};

export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];
