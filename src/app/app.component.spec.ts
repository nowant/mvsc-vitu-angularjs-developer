import * as angular from 'angular';
import 'angular-mocks';
import {AppComponent} from './app.component';

describe('App component', () => {
  beforeEach(() => {
    angular
      .module('app', [])
      .component(AppComponent.selector, AppComponent);
    angular.mock.module('app');
  });

  it('should exist', angular.mock.inject(($componentController: any) => {
    const component = $componentController(AppComponent.selector, {}, {});
    expect(component).toBeDefined();
  }));
});
