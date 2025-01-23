import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { routes } from './app.routes';
import { StoreService } from './shared/store.service';
import { BackendService } from './shared/backend.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
    provideHttpClient(),
    provideAnimations(),
    StoreService,
    BackendService,
    importProvidersFrom(
      MatToolbarModule,
      MatMenuModule,
      MatButtonModule
    )
  ]
};
