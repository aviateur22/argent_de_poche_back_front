import { ReasonMovementDto } from "../models/child-money.dto";
import { FamilyChildAccountDto } from "../models/family-account.dto";

/**
 * Compte de famille
 */
export interface FamilyAccount {
  familyName: string,
  childAccounts: FamilyChildAccountDto[]
}

/**
 * Objet compte d'argent de poche d'un enfant
 */
export interface ChildMoneyAccount {
  childMoneyAccountId: string;
  childImageName: string;
  childName: string;
  remainingMoney: number;
  moneyAtPeriodStart: number;
  periodName: string;
  startPeriodDate: Date | undefined;
  endPeriodDate: Date | undefined;
  actualDate: Date | undefined;
  availableReasonMovements : ReasonMovement[]
}

export interface ReasonMovement extends ReasonMovementDto {

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
