import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [provideAnimations()],
})
  .catch((err) => console.log(err));