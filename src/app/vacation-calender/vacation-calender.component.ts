import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';

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
  columKey: string;
}


@Component({
  selector: 'app-vacation-calender',
  templateUrl: './vacation-calender.component.html',
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
    MatLabel,
    MatCardModule,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatDatepickerModule,
    MatFormField,
    MatInput,
    FormsModule,
    NgIf,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    NgForOf,
    NgClass,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
  ],
  styleUrls: ['./vacation-calender.component.css'],
  providers: [provideNativeDateAdapter()]
})
export class VacationCalenderComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: 'Jonas',
      vacations: [
        {id: 1, initdate: new Date(2025, 0, 2), enddate: new Date(2025, 0, 10)},
        {id: 2, initdate: new Date(2025, 0, 20), enddate: new Date(2025, 0, 25)}
      ]
    },
    {
      id: 2,
      name: 'Rosa',
      vacations: [
        {id: 1, initdate: new Date(2025, 0, 5), enddate: new Date(2025, 0, 12)},
        {id: 2, initdate: new Date(2025, 0, 15), enddate: new Date(2025, 0, 18)}
      ]
    },
    {
      id: 3,
      name: 'Ronaldo',
      vacations: [
        {id: 1, initdate: new Date(2025, 0, 3), enddate: new Date(2025, 0, 7)},
        {id: 2, initdate: new Date(2025, 0, 22), enddate: new Date(2025, 0, 28)}
      ]
    }
  ];

  // Intervalo de filtro
  startDate: Date | null = new Date(2025, 0, 1); // Padrão: 1º de janeiro
  endDate: Date | null = new Date(2025, 0, 30); // Padrão: 28 de fevereiro
  maxIntervalDays = 60; // Máximo de 2 meses
  errorMessage: string | null = null;

  // Dias do intervalo selecionado
  days: DayEntry[] = [];
  displayedColumns: string[] = [];

  constructor() {
    this.updateDaysAndColumns();
  }

  ngOnInit(): void {
  }

  updateDaysAndColumns(): void {
    this.days = [];
    this.displayedColumns = ["name"];
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
      const dateStr = currentDate.toISOString().split("T")[0];
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      if (day >= 1){
        this.days.push({
          date: new Date(currentDate),
          day,
          month,
          year,
          columKey: `day-${dateStr}`
        });
        this.displayedColumns.push(`day-${dateStr}`);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  // Verifica se um dia está dentro de qualquer período de férias do usuário
  isVacation(user: User, dayEntry: DayEntry): boolean {
    const today = new Date(dayEntry.year, dayEntry.month - 1, dayEntry.day);
    today.setHours(0, 0, 0, 0); // Normalizar
    return user.vacations.some(vacation => {
      const init = new Date(vacation.initdate);
      const end = new Date(vacation.enddate);
      init.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return today >= init && today <= end;
    });
  }

  onDateChange(): void {
    this.updateDaysAndColumns();
  }
}
