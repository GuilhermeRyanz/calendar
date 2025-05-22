import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {
  MatTableModule,
  MatColumnDef,
  MatHeaderCell,
  MatCell,
  MatCellDef,
  MatHeaderCellDef,
  MatHeaderRow,
  MatRow,
  MatRowDef,
  MatHeaderRowDef
} from '@angular/material/table';

export interface User {
  id: number;
  name: string;
  vacations: Vacation[];
}

export interface Vacation {
  id: number;
  initdate: Date;
  enddate: Date;
}

interface DayEntry {
  date: Date;
  day: number;
  month: number;
  year: number;
  columnKey: string;
}

interface VacationStatus {
  isVacation: boolean;
  isStart?: boolean;
  isEnd?: boolean;
}

@Component({
  selector: 'app-vacation-calender',
  templateUrl: './vacation-calender.component.html',
  styleUrls: ['./vacation-calender.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    NgIf,
    NgForOf,
    NgClass,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatLabel
  ],
  providers: [provideNativeDateAdapter()]
})
export class VacationCalenderComponent implements OnInit {

  private monthAbbreviations: { [key: number]: string } = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez'
  };

  users: User[] = [
    {
      id: 1,
      name: 'Jonas',
      vacations: [
        { id: 1, initdate: new Date(2025, 0, 2), enddate: new Date(2025, 0, 10) },
        { id: 2, initdate: new Date(2025, 0, 20), enddate: new Date(2025, 0, 25) }
      ]
    },
    {
      id: 2,
      name: 'Rosa',
      vacations: [
        { id: 1, initdate: new Date(2025, 0, 5), enddate: new Date(2025, 0, 12) },
        { id: 2, initdate: new Date(2025, 0, 15), enddate: new Date(2025, 0, 18) }
      ]
    },
    {
      id: 3,
      name: 'Ronaldo',
      vacations: [
        { id: 1, initdate: new Date(2025, 0, 3), enddate: new Date(2025, 0, 7) },
        { id: 2, initdate: new Date(2025, 0, 22), enddate: new Date(2025, 0, 28) }
      ]
    }
  ];

  startDate: Date | null = new Date(2025, 0, 1);
  endDate: Date | null = new Date(2025, 0, 30);
  maxIntervalDays = 60;
  errorMessage: string | null = null;

  days: DayEntry[] = [];
  displayedColumns: string[] = [];

  constructor() {
    this.updateDaysAndColumns();
  }

  ngOnInit(): void {}

  getMonthAbbreviation(month: number): string {
    return this.monthAbbreviations[month] || month.toString();
  }

  updateDaysAndColumns(): void {
    this.days = [];
    this.displayedColumns = ['name'];
    this.errorMessage = null;

    if (!this.startDate || !this.endDate) {
      this.errorMessage = 'Selecione um intervalo de datas.';
      return;
    }

    const diffTime = this.endDate.getTime() - this.startDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    if (diffDays < 0) {
      this.errorMessage = 'A data de fim deve ser após a data de início.';
      return;
    }
    if (diffDays > this.maxIntervalDays) {
      this.errorMessage = 'O intervalo máximo é de 2 meses.';
      return;
    }

    const currentDate = new Date(this.startDate);
    currentDate.setHours(0, 0, 0, 0);
    while (currentDate <= this.endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      if (day >= 1) {
        this.days.push({
          date: new Date(currentDate),
          day,
          month,
          year,
          columnKey: `day-${dateStr}`
        });
        this.displayedColumns.push(`day-${dateStr}`);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  isVacation(user: User, dayEntry: DayEntry): VacationStatus {
    const today = new Date(dayEntry.year, dayEntry.month - 1, dayEntry.day);
    today.setHours(0, 0, 0, 0);

    for (const vacation of user.vacations) {
      const init = new Date(vacation.initdate);
      const end = new Date(vacation.enddate);
      init.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      if (today >= init && today <= end) {
        return {
          isVacation: true,
          isStart: today.getTime() === init.getTime(),
          isEnd: today.getTime() === end.getTime()
        };
      }
    }

    return { isVacation: false };
  }

  onDateChange(): void {
    this.updateDaysAndColumns();
  }
}
