import { Component, input } from '@angular/core';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-checklist-item-list',
  template: `
    <mat-card>
      <mat-card-content>
        <mat-list>
          @for (item of checklistItems(); track item.id) {
            <mat-list-item>
              <span matListItemTitle>{{ item.title }}</span>
            </mat-list-item>
          } @empty {
            <mat-card>
              <mat-card-header>
                <mat-card-title>Add an item</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>
                  Click the add button to add your first item to this quicklist
                </p>
              </mat-card-content>
            </mat-card>
          }
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  imports: [MatListModule, MatIconModule, MatCardModule],
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
}
