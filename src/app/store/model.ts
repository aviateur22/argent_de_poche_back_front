/**
 * Objet compte d'argent de poche d'un enfant
 */
export interface ChildMoney {
  childImageName: string;
  childName: string;
  remainingMoney: number;
  moneyAtPeriodStart: number;
  periodName: string;
  startPeriodDate: Date | undefined;
  endPeriodDate: Date | undefined;
}

/**
 * Object Flash message
 */
export interface FlashMessage {
  title: string,
  message: string,
  isError: boolean
}

/**
 * Objet sur le statut des requêtes de l'application
 */
export interface RequestStatus {
    isLoading: boolean,
    isSuccess: boolean,
}
