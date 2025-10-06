import { Component, inject, signal } from '@angular/core';
import { Shop } from '../../../core/services/shop';
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList } from '@angular/material/list';
import { MatListOption } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  imports: [
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton
  ],
  templateUrl: './filter-dialog.html',
  styleUrl: './filter-dialog.scss'
})
export class FilterDialog {
  protected shopService = inject(Shop);
  private dialogRef = inject(MatDialogRef<FilterDialog>);
  data = inject(MAT_DIALOG_DATA)

  selectedBrands = signal<string[]>(this.data.selectedBrands);
  selectedTypes = signal<string[]>(this.data.selectedTypes);

  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands(),
      selectedTypes: this.selectedTypes()
    });
  }
}
