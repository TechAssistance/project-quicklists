import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Checklist, RemoveChecklist } from '../../shared/interfaces/checklist';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-checklist-header',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button routerLink="/home">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span>{{ checklist().title }}</span>
      <span class="spacer"></span>
      <button mat-raised-button color="accent" (click)="addItem.emit()">
        Add item
      </button>
      <button mat-raised-button (click)="resetChecklist.emit(checklist().id)">
        Reset All
      </button>
    </mat-toolbar>
  `,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>();
  resetChecklist = output<RemoveChecklist>();
  addItem = output();
}
