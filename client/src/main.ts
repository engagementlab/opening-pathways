import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
    
  // GA tracking
  document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-64617433-14"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date()); gtag(\'config\', \'UA-64617433-14\'); </script>');
}

// App QA validator
if(environment.qa) {

  document.write('<meta name="insight-app-sec-validation" content="6162dd7c-0e84-474c-a969-e5d72e6dbbe4">')

}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
