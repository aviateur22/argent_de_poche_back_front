import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { applicationReducers } from './store/reducer';
import { MessageService } from 'primeng/api';
import { FeatureKey } from './store/selector';
import { provideEffects } from '@ngrx/effects';
import { Effect } from './store/effect';
import { DevService } from './services/dev.service';

export function initializeApp(devService: DevService) {
  return () => devService.loadFictiveParent();
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [DevService],
      multi: true
    },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
            theme: {
              preset: Aura
            }
    }),
    provideStore(),
    provideState({ name: FeatureKey, reducer: applicationReducers }),
    provideEffects(Effect),
    MessageService
  ]
};
