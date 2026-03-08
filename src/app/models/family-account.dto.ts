
/**
 * Dto pour chargement d'un compte de famille
 */
export interface LoadFamilyAccountDto {
  parentId: string
}

/**
 * Dto permettant de récupérer les données d'une famille
 */
export interface FamilyAccountDto {
  familyAccountId: string,
  childs: FamilyChildAccountDto[]
}

/**
 * Enfant de la famille
 */
export interface FamilyChildAccountDto {
  childAccountId: string,
  name: string,
  imageRandomName: string
}

/**
 * Dto permettant de créer une nouvelle famille
 * Ce dto est appelé lors de la création d'un nouveau compte
 */
export interface CreateFamilyAccountDto {
  email: string,
  password: string,
  parentName: string,
  familyName: string
}

/**
 * Dto de réponse à la creation
 */
export interface FamilyAccountResponseDto {
  createdFamilyAccountId: string
  createdParentId: string
}
