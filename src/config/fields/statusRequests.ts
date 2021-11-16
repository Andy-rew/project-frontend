export enum statusRequests {
  'draft' = 'draft', // Черновик
  'accept' = 'accept', // Одобрена
  'reject' = 'decline', // Отклонена
  'documents' = 'docscheck', // Проверка документов
  'commission' = 'commission', // Рассмотрение комиссии
  'closed' = 'closed', // Работа завершена
  'await' = 'wait', // Ожидает
}

export const statusRequestsTranslation: { [k: string]: string } = {
  [statusRequests.draft]: 'Черновик',
  [statusRequests.accept]: 'Одобрена',
  [statusRequests.reject]: 'Отклонена',
  [statusRequests.documents]: 'Проверка документов',
  [statusRequests.commission]: 'Рассмотрение комиссии',
  [statusRequests.closed]: 'Работа завершена',
  [statusRequests.await]: 'Ожидает',
}

export const statusRequestsBadges: { [k: string]: string } = {
  [statusRequests.draft]: 'Ч',
  [statusRequests.accept]: 'Од',
  [statusRequests.reject]: 'От',
  [statusRequests.documents]: 'Д',
  [statusRequests.commission]: 'Р',
  [statusRequests.closed]: 'З',
  [statusRequests.await]: 'Ож',
}
