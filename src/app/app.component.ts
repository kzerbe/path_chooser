import { Component } from '@angular/core';
import {PathItem, PathService} from './path-service';

interface Choice {
  itemIndex: number;
  value: string;
}

@Component({
  selector: 'app-root',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3>Path Chooser Sandbox</h3>
      </div>
      <div class="card-body">
        <h4>Select Source</h4>
        <path-chooser [pathItems]="streams" (chosen)="onChosen('source', $event)"></path-chooser>
        <h4>Select Animal</h4>
        <path-chooser [pathItems]="animals" (chosen)="onChosen('species', $event)"></path-chooser>
      </div>
      <div class="card-footer">
        <span>{{topic}}:&nbsp;{{choice | json}}</span>
      </div>
    </div>
    
  </div>`,
  styles: []
})
export class AppComponent {
  streams: PathItem[];
  animals: PathItem[];
  choice: Choice;
  topic: string;

  constructor(private pathService: PathService) {
    this.streams = this.pathService.pathStreamItems;
    this.animals = this.pathService.animals;
  }

  onChosen(topic: string, choice: Choice)
  {
    this.topic = topic;
    this.choice = choice;
  }
}
