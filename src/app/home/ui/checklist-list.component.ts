import { Component, input } from '@angular/core';
import { Checklist } from '../../shared/interfaces/checklist';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'checklist-list',
  template: `
    <mat-list role="list">
      @for (checklist of checklists(); track checklist.id) {
        <mat-list-item routerLink="/checklist/{{ checklist.id }}">
          {{ checklist.title }}
        </mat-list-item>
        <mat-divider></mat-divider>
      } @empty {
        <mat-list-item
          >Click Button to create your first checklist!
        </mat-list-item>
      }
    </mat-list>
  `,
  imports: [MatDividerModule, MatListModule, RouterLink],
})
export class ChecklistList {
  checklists = input.required<Checklist[]>();
}
