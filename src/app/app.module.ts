// temporary, until https://github.com/Microsoft/TypeScript/issues/10178 is implemented
import * as angular from 'angular';
import {AppComponent} from './app.component';
import {SelectFormComponent} from './select-form.component';

export const moduleName = angular.module('application', [])
    .component('app', AppComponent)
    .component('selectForm', SelectFormComponent)
    .name;
