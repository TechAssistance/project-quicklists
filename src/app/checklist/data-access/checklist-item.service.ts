import { signal, computed, Injectable } from '@angular/core';
import {
  AddChecklistItem,
  ChecklistItem,
  RemoveChecklistItem,
} from '../../shared/interfaces/checklist-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { RemoveChecklist } from '../../shared/interfaces/checklist';

export interface CheckListItemState {
  checklistItems: ChecklistItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  // state
  private state = signal<CheckListItemState>({
    checklistItems: [],
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);

  // sources
  add$ = new Subject<AddChecklistItem>();
  toggle$ = new Subject<RemoveChecklistItem>();
  reset$ = new Subject<RemoveChecklist>();

  constructor() {
    // Add Reducer
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: [
          ...state.checklistItems,
          {
            ...checklistItem.item,
            id: Date.now().toString(),
            checklistId: checklistItem.checklistId,
            checked: false,
          },
        ],
      })),
    );

    // Toggle Reducer
    this.toggle$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.id === checklistItemId
            ? { ...item, checked: !item.checked }
            : item,
        ),
      })),
    );

    // Reset Reducer
    this.reset$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
      this.state.update((state) => ({
        ...state,
        checklistItems: state.checklistItems.map((item) =>
          item.checklistId === checklistId ? { ...item, checked: false } : item,
        ),
      })),
    );
  }
}
