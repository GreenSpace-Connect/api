export const Role = {
  ADMIN: 'admin',
  USER: 'user',
};

export type Role = (typeof Role)[keyof typeof Role];
