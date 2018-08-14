import {ISelectItem} from './interface';

export const SelectFormComponent = {
  selector: 'selectForm',
  bindings: {
    ngModel: '=',
    forms: '<',
    ngChange: '&'
  },
  require: {
    ngModelCtrl: 'ngModel'
  },
  template: `
    <div ng-repeat="formName in $ctrl.ngModel track by $index">
      <select ng-model="$ctrl.ngModel[$index]"
              ng-change="$ctrl.onEditForm()"
              ng-disabled="$ctrl.isFormRequired(formName)">
        <option ng-repeat="option in $ctrl.filterRestFormNamesWith(formName)"
                value="{{option}}">
          {{option}}
        </option>
      </select>
      <ng-template ng-if="$last">
        <button ng-if="!$ctrl.isFormRequired(formName)"
                ng-click="$ctrl.onRemoveForm($index)">x</button>
        <button ng-if="$ctrl.canAddForm()"
                ng-click="$ctrl.onAddForm()">+</button>
      </ng-template>
    </div>
  `,
  controller: class SelectFormComponentController {
    public ngModel: string[];

    public forms: ISelectItem[] = [];

    public ngChange: Function = () => false;

    $onInit() {
      this.ngModel = this.filterAndMapRequiredFormsToNames();
    }

    public onAddForm() {
      const nextForm = this.filterRestFormNamesWith().shift();
      this.ngModel.push(nextForm);
      this.ngChange();
    }

    public onEditForm() {
      this.ngChange();
    }

    public onRemoveForm(index: number) {
      this.ngModel.splice(index, 1);
      this.ngChange();
    }

    public canAddForm() {
      return this.ngModel.length < this.forms.length;
    }

    public isFormRequired(formName: string) {
      const index = this.forms.findIndex(f => f.formName === formName);

      if (index > -1 && this.forms[index]) {
        return this.forms[index].required;
      }

      return false;
    }

    private filterRestFormNamesWith(formName: string = null) {
      const forms = this.forms
        .filter(f => this.ngModel.indexOf(f.formName) < 0)
        .map(f => f.formName);

      return formName
        ? [formName, ...forms]
        : forms;
    }

    private filterAndMapRequiredFormsToNames() {
      return this.forms
        .filter(f => f.required === true)
        .map(f => f.formName);
    }
  }
};
