import { Component } from '@angular/core';
import {Persoon} from './model/persoon';

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1>
            <h2>Personen</h2>
            <ul>
              <li *ngFor="let p of personen">
                <span>{{p.name}}</span>
              </li>
            </ul>`,
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  static readonly PERSONEN: Persoon[]=[
  {name: 'Ann'},
  {name: 'Elise'},
  {name: 'Marie'},
  {name: 'Els'},
  {name: 'Jan'},
  {name: 'Piet'},
  {name: 'Joris'},
  {name: 'Jos'},
  {name: 'Ken'},
  {name: 'Andrew'},
  ] 
  title = 'Personen-app';
  personen =AppComponent.PERSONEN;

}
