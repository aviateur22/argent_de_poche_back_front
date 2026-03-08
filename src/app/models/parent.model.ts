
/**
 * Les données sur un parent authentifié
 */
export interface Parent {
  parentId: string,
  parentName:string,
  familyName: string,
  roles: string [],
  sessionValidUntil: Date
}
