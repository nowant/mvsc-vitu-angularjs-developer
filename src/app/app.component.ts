import {ISelectItem} from './interface';

export const AppComponent = {
  selector: 'app',
  template: `
    <select-form ng-model="$ctrl.selectedForms"
                 ng-change="$ctrl.onFormChange()"
                 forms="$ctrl.availableForms">
    </select-form>
  `,
  controller: class AppComponentController {
    public selectedForms: string[];

    public availableForms: ISelectItem[];

    $onInit() {
      this.availableForms = [
        {formName: 'CONTRACT TORP INC', required: true},
        {formName: 'CONTRACT CONNER AND SONS', required: false},
        {formName: 'CONTRACT MILLER, LYNCH AND WEBER', required: false},
        {formName: 'CONTRACT LEDNER, HILLS AND ERNSER', required: false},
        {formName: 'CONTRACT STEHR GROUP', required: true},
        {formName: 'CONTRACT GULGOWSKI - STEUBER', required: false}
      ];
    }

    public onFormChange() {
      console.log('Selected Forms: ');
      console.log(this.selectedForms);
    }
  }
};

