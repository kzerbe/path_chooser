import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PathItem, PathService} from './path-service';

@Component({
  selector: 'path-chooser',
  template: `<fieldset>
      <div class="row">
        <div class="col-xs-4" *ngFor="let item of pathItems">
          <div *ngIf="!item.hidden" class="form-group">
            <label>{{item.label}}
              <select [value]="item.value" class="form-control-sm">
                <option value="" disabled>Select</option>
                <option *ngFor="let option of item.listItems | async" [value]="option">{{option}}</option>
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
  @Output() gotSelected = new EventEmitter<string[]>();
}
