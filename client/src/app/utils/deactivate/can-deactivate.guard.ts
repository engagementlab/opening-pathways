import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ComponentCanDeactivate } from './component-can-deactivate';

@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate>  {

  canDeactivate(component: ComponentCanDeactivate): boolean {

      if (!component.canDeactivate()) {

        // if there are no pending changes (see by inherited boolean),
        // just allow deactivation; else confirm first
        if (confirm('WARNING: You will lose any un-submitted work by leaving this page.')) {
          return true;
        } else {
          return false;
        }

      }

      return true;

  }

}