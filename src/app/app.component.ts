import {Component} from '@angular/core';
import {PathItem, PathService, Choice, Mode, Modes} from './path-service';

@Component({
  selector: 'app-root',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3>Path Chooser Sandbox</h3>
      </div>
      <div class="card-body">
        <h4>Select Source</h4>
        <path-chooser [pathItems]="streams" (chosen)="onChosen('streams', $event)" (path)="onPath($event)"></path-chooser>
        <h4>Select Animal</h4>
        <path-chooser [pathItems]="species" (chosen)="onChosen('species', $event)"></path-chooser>
        <h4>Modes</h4>
        <form #f= "ngForm" class="row">
          <div class="col-xs-4 pad">
            <select class="form-control" name="mode" [(ngModel)]="mode">
              <option *ngFor="let mode of modes|async" [value]="mode">{{modeKey(mode)}}</option>
            </select>
          </div>
          <div class="col-xs-4 pad">
            <p>{{mode}}</p>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <p>{{topic}}:&nbsp;{{choice | json}}</p>
        <label>Path {{path}}</label>
      </div>
    </div>
    
  </div>`,
  styles: ['.pad {margin: 0 10px 0 10px}']
})
export class AppComponent {
  streams: PathItem[];
  species: PathItem[];
  choice: Choice;
  topic: string;
  path: string;
  modes = Modes;
  mode = Mode.three;

  modeKey(mode: Mode) {
    return Mode[mode];
  }

  constructor(private pathService: PathService) {
    this.streams = this.pathService.pathStreamItems;
    this.species = this.pathService.animals;
  }

  onChosen(topic: string, choice: Choice) {
    this.topic = topic;
    this.choice = choice;
    if (topic === 'streams') {
      this.pathService.hideDependend(this.streams, choice.itemIndex + 1);
    }
  }

  onPath(path: string[]) {
    this.path = path.join('.');
  }

}
