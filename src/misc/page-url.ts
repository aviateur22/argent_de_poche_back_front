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
  login: {
    url: 'auth/connexion',
    title:  `${environment.main_page_title} | Connexion`
  }
}
