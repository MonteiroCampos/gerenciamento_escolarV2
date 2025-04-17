import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideToastr({
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      autoDismiss: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressAnimation: 'increasing'
    }),
    provideAnimations(),
  ],

};
