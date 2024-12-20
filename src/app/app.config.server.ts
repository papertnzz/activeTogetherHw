import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideClientHydration } from '@angular/platform-browser'; // Импортируем гидрацию
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration() // Добавляем гидрацию
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
