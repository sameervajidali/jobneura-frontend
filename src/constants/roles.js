// src/constants/roles.js
export const VALID_ROLES = [
    'user',
    'moderator',
    'creator',
    'support',
    'admin',
    'superadmin',
  ];
  
  // for convenience groups
  export const ADMIN_ROLES = ['admin', 'superadmin'];
  export const MODERATOR_ROLES = ['moderator', 'admin', 'superadmin'];
  export const SUPPORT_ROLES = ['support', 'admin', 'superadmin'];
  export const CREATOR_ROLES = ['creator', 'admin', 'superadmin'];
  