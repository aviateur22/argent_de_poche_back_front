import { ReasonMovementDto } from "../models/child-money.dto";
import { FamilyChildAccountDto } from "../models/family-account.dto";

/**
 * Parent
 */
export interface Parent {
  parentName: string,
  familyName: string
}

/**
 * Compte de famille
 */
export interface FamilyAccount {
  familyAccountId: string,
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

/**
 * Les raison de mouvement d'argent disponible pour un compte
 */
export interface ReasonMovement extends ReasonMovementDto {

}

/**
 * Objet permettant d'afficher le composant "app-remaining-money-animation"
 * Quand l'argent de poche restant est modifiée
 */
export interface DisplayRemainingMoneyOnChange {
  isVisible: boolean;
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

/**
 * Animation chute des pieces
 */
export interface IsCoinAnimationActive {
  isActive: boolean
}

/**
 * Animation chute des confettis
 */
export interface IsConfettiAnimationActive {
  isActive: boolean
}
