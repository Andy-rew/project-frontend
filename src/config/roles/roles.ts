export enum roles {
  'admin' = 'admin', // Администратор
  'contentmanager' = 'contentmanager', // Контент-менеджер
}

export const rolesTranslation: { [k: string]: string } = {
  [roles.admin]: 'Администратор',
  [roles.contentmanager]: 'Контент-менеджер',
}

export const rolesBadges: { [k: string]: string } = {
  [roles.admin]: 'Адм',
  [roles.contentmanager]: 'К-М',
}
