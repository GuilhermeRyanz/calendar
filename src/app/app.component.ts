import {Component} from '@angular/core';
import {VacationCalenderComponent} from './vacation-calender/vacation-calender.component';

@Component({
  selector: 'app-root',
  imports: [VacationCalenderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vacation-calender';
}
