import { Component, inject } from '@angular/core';
import { Shop } from '../../../core/services/shop';
import { MatDivider } from '@angular/material/divider';
import { MatSelectionList } from '@angular/material/list';
import { MatListOption } from '@angular/material/list';
import { MatButton } from '@angular/material/button';

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
}
