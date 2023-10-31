export const FilePlace = {
  EVENTS: 'events',
  AVATARS: 'avatars',
  COMMUNITIES: 'communities',
};

export type FilePlace = (typeof FilePlace)[keyof typeof FilePlace];
