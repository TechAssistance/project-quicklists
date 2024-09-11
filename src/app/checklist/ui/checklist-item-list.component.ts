import { Component, input, output } from '@angular/core';
import {
  ChecklistItem,
  RemoveChecklistItem,
} from '../../shared/interfaces/checklist-item';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'app-checklist-item-list',
  template: `
    <mat-card>
      <mat-card-content>
        <mat-list>
          @for (item of checklistItems(); track item.id) {
            <mat-list-item>
              <mat-checkbox
                [checked]="item.checked"
                (change)="toggle.emit(item.id)"
                matListItemMeta
              ></mat-checkbox>
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
  imports: [MatListModule, MatCheckboxModule, MatIconModule, MatCardModule],
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
  toggle = output<RemoveChecklistItem>();
}
