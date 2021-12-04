export enum roles {
  culprit = 'culprit', //виновник
  victim = 'victim', // потерпевший
  suspect = 'suspect', // подозреваемый
  witness = 'witness', // свидетель
}
export const rolesTranslation: { [k: string]: string } = {
  [roles.culprit]: 'виновник',
  [roles.victim]: 'жертва',
  [roles.suspect]: 'подозреваемый',
  [roles.witness]: 'свидетель',
}
