import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  template: require('./app.component.html'),
  style: require('./app.component.css')
})
export class AppComponent {
  name = 'Angular!';
}
