import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PathItem} from './path-service';


@Component({
  selector: 'path-chooser',
  template: `<fieldset>
      <div class="row">
        <div class="col-xs-4" *ngFor="let item of pathItems; let idx=index">
          <div *ngIf="!item.hidden" class="form-group">
            <label>{{item.label}}
              <select [value]="item.value" class="form-control-sm" (change)="onSelection($event.target.value, idx)">
                <option value="" disabled>Select</option>
                <option *ngFor="let option of item.listItems | async" [value]="option">
                  {{option}}
                </option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </fieldset>`,
  styles: ['.col-xs-4 {width: 120px}']
})
export class PathChooserComponent {
  @Input() pathItems: PathItem[];
  @Input() preSelected: string[];
  @Output() chosen = new EventEmitter<{itemIdx, value}>();

  onSelection(value: string, idx: number) {
    this.chosen.next({itemIdx: idx, value: value});
  }
}
