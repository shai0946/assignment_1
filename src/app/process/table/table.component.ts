import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { displayedColumns } from '../Model/constant';
import { processTable } from '../Model/model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges  {
  @Input() tableDataSource: any;
  displayedColumns: string[] = displayedColumns;
  dataSource :MatTableDataSource<processTable> = new MatTableDataSource();

  constructor() { }

  // update changes for @input decorator for dataSource in table
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tableDataSource);  
  }

  ngOnInit(): void { }

  //Filter or search in table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
}
