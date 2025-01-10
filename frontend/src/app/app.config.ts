import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './utils/token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes), 
              provideClientHydration(), 
              provideHttpClient(withFetch(), withInterceptors([tokenInterceptor])), 
              provideAnimations(), 
              provideToastr()]
};
