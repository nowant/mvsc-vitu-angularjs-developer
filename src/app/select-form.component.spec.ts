import * as angular from 'angular';
import 'angular-mocks';
import {SelectFormComponent} from './select-form.component';

describe('App component', () => {
  beforeEach(() => {
    angular
      .module('app', [])
      .component(SelectFormComponent.selector, SelectFormComponent);
    angular.mock.module('app');
  });

  it('should exist', angular.mock.inject(($componentController: any) => {
    const component = $componentController(SelectFormComponent.selector, {}, {});
    expect(component).toBeDefined();
  }));

  it('should return "true" for the form with the name "bbb" as required', angular.mock.inject(($componentController: any) => {
    const availableForms = [
      {formName: 'aaa', required: false},
      {formName: 'bbb', required: true},
      {formName: 'ccc', required: false}
    ];

    const component = $componentController(SelectFormComponent.selector, {}, {
      forms: availableForms
    });

    const required = component.isFormRequired('bbb');
    expect(required).toBe(true);
  }));

  it('should allow to add a new form', angular.mock.inject(($componentController: any) => {
    const availableForms = [
      {formName: 'aaa', required: false},
      {formName: 'bbb', required: false},
      {formName: 'ccc', required: false}
    ];

    const component = $componentController(SelectFormComponent.selector, {}, {
      forms: availableForms,
      ngModel: ['aaa', 'ccc']
    });

    const allowed = component.canAddForm();
    expect(allowed).toBe(true);
  }));

  it('should not allow to add a new form', angular.mock.inject(($componentController: any) => {
    const availableForms = [
      {formName: 'aaa', required: false},
      {formName: 'bbb', required: false},
      {formName: 'ccc', required: false}
    ];

    const component = $componentController(SelectFormComponent.selector, {}, {
      forms: availableForms,
      ngModel: ['bbb', 'aaa', 'ccc']
    });

    const allowed = component.canAddForm();
    expect(allowed).toBe(false);
  }));

  it('should add "bbb" form as next form', angular.mock.inject(($componentController: any) => {
    const availableForms = [
      {formName: 'aaa', required: false},
      {formName: 'bbb', required: false},
      {formName: 'ccc', required: false}
    ];

    const component = $componentController(SelectFormComponent.selector, {}, {
      forms: availableForms,
      ngModel: ['aaa']
    });

    component.onAddForm();

    const nextForm = component.ngModel[1];
    expect(nextForm).toBe('bbb');
  }));

  it('should remove "ccc" form', angular.mock.inject(($componentController: any) => {
    const component = $componentController(SelectFormComponent.selector, {}, {
      ngModel: ['bbb', 'ccc']
    });

    component.onRemoveForm(1);
    expect(component.ngModel).toEqual(['bbb']);
  }));

  it('should trigger change event', angular.mock.inject(($componentController: any) => {
    const bindings = {
      ngModel: ['ccc', 'aaa'],
      ngChange: jasmine.createSpy('ngChange')
    };

    const component = $componentController(SelectFormComponent.selector, {}, bindings);
    component.ngModel[1] = 'bbb';
    component.onEditForm();
    expect(bindings.ngChange).toHaveBeenCalled();
  }));
});
