import { KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
@Component({
  standalone: true,
  selector: 'app-form-modal',
  template: `
    <header>
      <h2>{{ title() }}</h2>
      <button mat-icon-button (click)="close.emit()">
        <mat-icon>close</mat-icon>
      </button>
    </header>
    <section>
      <form [formGroup]="formGroup()" (ngSubmit)="save.emit(); close.emit()">
        @for (control of formGroup().controls | keyvalue; track control.key) {
          <mat-form-field>
            <label [for]="control.key"> {{ control.key }} </label>
            <input
              matInput
              [id]="control.key"
              type="text"
              [formControlName]="control.key"
            />
          </mat-form-field>
        }
        <button mat-flat-button type="submit">Save</button>
      </form>
    </section>
  `,
  imports: [
    ReactiveFormsModule,
    KeyValuePipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>();
  title = input.required<string>();
  save = output();
  close = output();
}
