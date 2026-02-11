
/**
 * Les données sur un parent authentifié
 */
export interface Parent {
  parentId: string,
  roles: string [],
  sessionValidUntil: Date
}
