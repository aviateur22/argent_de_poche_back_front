import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { applicationReducers } from './store/reducer';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideEffects } from '@ngrx/effects';
import { Effect } from './store/effect';
import { DevService } from './services/dev.service';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { FeatureKey } from './store/selector';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, isDevMode } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './interceptor/http.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export function initializeApp(devService: DevService) {
  return () => devService.loadFictiveParent();
}
registerLocaleData(localeFr);
export const appConfig: ApplicationConfig = {
  providers: [
    NgOptimizedImage,
    provideHttpClient(withInterceptors([httpInterceptor])),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
            theme: {
              preset: Aura
            }
    }),
    provideStore(),
    provideState(FeatureKey, applicationReducers),
    provideEffects(Effect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    MessageService,
    ConfirmationService, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
