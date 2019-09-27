import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DeactivateGuard {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<DeactivateGuard> {
  canDeactivate(component: DeactivateGuard,
  	currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): boolean | Observable<boolean> {

    // if there are no pending changes, just allow deactivation; else confirm first
    return confirm('WARNING: You will lose any un-submitted work by leaving this page.'); 

  }
}