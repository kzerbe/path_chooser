import { Component } from '@angular/core';
import {PathItem, PathService} from './path-service';

@Component({
  selector: 'app-root',
  template: `<div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3>Path Chooser Sandbox</h3>
      </div>
      <div class="card-body">
        <h4>Select Source</h4>
        <path-chooser [pathItems]="streams"></path-chooser>
        <h4>Select Destination</h4>
        <path-chooser [pathItems]="animals"></path-chooser>
      </div>
    </div>
    
  </div>`,
  styles: []
})
export class AppComponent {
  streams: PathItem[];
  animals: PathItem[];

  constructor(private pathService: PathService) {
    this.streams = this.pathService.pathStreamItems;
    this.animals = this.pathService.animals;
  }
}
