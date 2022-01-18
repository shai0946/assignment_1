import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProcessComponent } from './process.component';
import { TableComponent } from './table/table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableComponent } from './datatable/datatable.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessComponent
  }
];

@NgModule({
  declarations: [
    ProcessComponent,
    TableComponent,
    DatatableComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [RouterModule]
})

export class ProcessModule { }
