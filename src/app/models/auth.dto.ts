/**
 * Dto envoyer pour authentification et connexion au compte famillale
 */
export interface LoginDto {
  email: string,
  password: string
}

/**
 * Dto recu apres connexion
 */
export interface LoginResponseDto {
  parentId: string,
  parentName: string,
  familyName: string,
  jwt: string,
  roles: string[],
  jwtExpiredAt: Date,
  message: string
}
