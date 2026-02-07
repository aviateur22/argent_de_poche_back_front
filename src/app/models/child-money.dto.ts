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
  message: string;
}

