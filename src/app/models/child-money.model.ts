export class ChildMoneyAccountModel {
  constructor(
  public readonly imageRandomName: string,      // Nom de l'image de profil
  public readonly childName: string,              // Nom de l'enfant
  public readonly remainingMoney: number,         // Argent restant
  public readonly moneyAtPeriodStart: number,     // Argent au début de la période
  public readonly actualDate: Date,             // Date actuelle (ISO format)
  public readonly startPeriodDate: Date,        // Date de début de période
  public readonly endPeriodDate: Date,          // Date de fin de période
  ) {}
}

