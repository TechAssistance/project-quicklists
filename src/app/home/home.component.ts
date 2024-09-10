import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from '../shared/ui/model.component';
import { signal } from '@angular/core';
import { Checklist } from '../shared/interfaces/checklist';
import { FormBuilder } from '@angular/forms';
import { FormModalComponent } from '../shared/ui/form-modal.component';
import { effect } from '@angular/core';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistList } from './ui/checklist-list.component';
@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <header>
      <h1>Quicklists</h1>
      <button mat-flat-button (click)="checklistBeingEdited.set({})">
        Add Checklist
      </button>
    </header>
    <checklist-list
      [checklists]="checklistService.checklists()"
    ></checklist-list>
    <app-modal [isOpen]="!!checklistBeingEdited()">
      <ng-template>
        <app-form-modal
          [title]="
            checklistBeingEdited()?.title
              ? checklistBeingEdited()!.title!
              : 'Add Checklist'
          "
          [formGroup]="checklistForm"
          (close)="checklistBeingEdited.set(null)"
          (save)="checklistService.add$.next(checklistForm.getRawValue())"
        />
      </ng-template>
    </app-modal>
  `,
  imports: [MatButtonModule, ModalComponent, FormModalComponent, ChecklistList],
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder);
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);
  checklistService = inject(ChecklistService);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });
  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited();

      if (!checklist) {
        this.checklistForm.reset();
      }
    });
  }
}
