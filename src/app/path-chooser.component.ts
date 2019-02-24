import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {PathItem, Choice} from './path-service';


@Component({
  selector: 'path-chooser',
  template: `<fieldset>
      <div class="row">
        <div class="col-xs-4" *ngFor="let item of pathItems; let idx=index">
          <div *ngIf="!item.hidden" class="form-group">
            <label>{{item.label}}
              <select [value]="item.value" class="form-control-sm" (change)="onSelection($event.target.value, idx)">
                <option value="">Select</option>
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
export class PathChooserComponent implements OnInit{
  @Input() pathItems: PathItem[];
  @Input() update: Choice;
  @Output() chosen = new EventEmitter<Choice>();
  @Output() path$ = new EventEmitter<string[]>();
  path: string[] = [];

  ngOnInit() {
    this.path = this.pathItems.map(item => item.value);
  }


  onSelection(value: string, idx: number) {
    this.chosen.next({itemIndex: idx, value: value});
    this.path[idx] = value;
    this.path$.next(this.path);
  }
}
