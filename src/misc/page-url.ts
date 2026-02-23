import { environment } from "../environment/environment";

export default {
  home: {
    url: '',
    title:  `${environment.main_page_title} | Bienvenue`
  },
  childAccount: {
    url: 'compte/enfant/:childAccountId/detail',
    title:  `${environment.main_page_title} | Argent de poche`
  },
  manageAccount: {
    url: 'compte/modification',
    title:  `${environment.main_page_title} | Modification`
  },
  login: {
    url: 'auth/connexion',
    title:  `${environment.main_page_title} | Connexion`
  },
  createChildAccount: {
    url: 'compte/enfant/creation',
    title:  `${environment.main_page_title} | Création compte`
  },
  familyAccount: {
   url: 'famille',
  title:  `${environment.main_page_title} | Famille`
  },
  createFamilyAccount: {
   url: 'famille/creation',
  title:  `${environment.main_page_title} | Création compte famille`
  }
}
