export const VALID_ROLES = [
  'USER',
  'MODERATOR',
  'CREATOR',
  'SUPPORT',
  'ADMIN',
  'SUPERADMIN',
];

// for convenience groups (still lowercase if used for UI logic)
export const ADMIN_ROLES = ['admin', 'superadmin'];
export const MODERATOR_ROLES = ['moderator', 'admin', 'superadmin'];
export const SUPPORT_ROLES = ['support', 'admin', 'superadmin'];
export const CREATOR_ROLES = ['creator', 'admin', 'superadmin'];
