export const FilePlace = {
  EVENTS: 'events',
  AVATARS: 'avatars',
};

export type FilePlace = (typeof FilePlace)[keyof typeof FilePlace];
