export const errorMessageName = 'Name must be between 3 and 10 characters';
export const errorMessageDescription =
  'Description must be at least 10 characters';
export const errorMessageDescriptionRequired = 'Description is required';
export const errorMessageStatus =
  'Status must be either "waiting" or "actif" or "done"';
export enum TodoStatusEnum {
  'waiting' = 'En attente',
  'actif' = 'En cours',
  'done' = 'Finalise',
}
