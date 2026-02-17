/**
 * Identifiant du compte d'argent de poche de l'enfnat
 */
export interface ChildAccountIdDto {
  childAccountId: string
}

export interface ChildAccountDto {
  childAccountIdentity: string;   // ID du compte enfant
  childIdentity: string;          // ID de l'enfant
  imageRandomName: string;        // Nom de l'image de profil
  childName: string;              // Nom de l'enfant
  remainingMoney: number;         // Argent restant
  moneyAtPeriodStart: number;     // Argent au début de la période
  periodName: string;             // Nom de la période
  actualDate: Date;             // Date actuelle (ISO format)
  startPeriodDate: Date;        // Date de début de période
  endPeriodDate: Date;          // Date de fin de période
  availableMovementReasonDtos: ReasonMovementDto[],
  message: string;
}

export interface ReasonMovementDto {
  reasonName: string,
  reasonCode: string,
  addMoneyActionCode: string
  removeMoneyActionCode: string
}

/**
 * Le dto permettant d'ajouter un nouveament d'argent sur un compte d'argent de poche
 */
export interface AddMoneyMovementDto {
  parentId: string,
  childAccountId: string,
  reasonCode: string, // Le code de la raison du mouvelent
  actionCode: string // L'action associé a ce mouvement d'argent (ajouter ou supprimer)
}

/**
 * Dto permattant de mettre à jour l'argent initial
 */
export interface UpdatedIntialMoneyDto {
  parentId: string,
  childAccountId: string,
  updatedMoneyAtPeriodStart: number
}

/**
 * Dto permettant de réinitialiser l'argent de poche restant
 */
export interface ReinitializeRemainingMoneyDto {
  parentId: string,
  childAccountId: string
}

/**
 * Dto permattant de mettre à jour le nom de l'enfant
 */
export interface UpdatedChildNameDto {
  parentId: string,
  childAccountId: string,
  updateChildName: string
}
