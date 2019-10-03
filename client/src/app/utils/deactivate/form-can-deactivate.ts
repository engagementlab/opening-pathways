import { ComponentCanDeactivate } from './component-can-deactivate';

export abstract class FormCanDeactivate extends ComponentCanDeactivate {

 abstract get canLeave(): boolean;
 
 canDeactivate():boolean{
      return this.canLeave
  }
}