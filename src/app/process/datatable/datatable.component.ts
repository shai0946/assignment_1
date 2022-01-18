import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { displayedColumns } from '../Model/constant';
import { processTable } from '../Model/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, OnChanges{
  @Input() tableDataSource: any;
  displayedColumns: string[] = displayedColumns;
  dataSource :MatTableDataSource<processTable> = new MatTableDataSource();

  //Form control to get the search string
  waterTempFilter = new FormControl();
  pump10Filter = new FormControl();
  pump5Filter = new FormControl();
  drainSensorFilter = new FormControl();
  WaterLevelFilter = new FormControl();

  filteredValues = { SensorDataWaterTemp:'', SensorDataPump10:'', SensorDataPump5:'',
                                             SensorDataDrainSensor:'', SensorDataWaterLevel:'' };

  constructor() { }

  //filter sensor data and assign to dataSource
  filterSensor(filterElement, sensorName){
    this.filteredValues[sensorName] = filterElement;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  // update changes for @input decorator for dataSource in table
  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.tableDataSource);

    this.waterTempFilter.valueChanges.subscribe(element=>this.filterSensor(element,'SensorDataWaterTemp'));
    this.pump10Filter.valueChanges.subscribe(element=>this.filterSensor(element,'SensorDataPump10'));
    this.pump5Filter.valueChanges.subscribe(element=>this.filterSensor(element,'SensorDataPump5'));
    this.drainSensorFilter.valueChanges.subscribe(element=>this.filterSensor(element,'SensorDataDrainSensor'));
    this.WaterLevelFilter.valueChanges.subscribe(element=>this.filterSensor(element,'SensorDataWaterLevel'));
    
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngOnInit(): void { }

  customFilterPredicate() {
    const myFilterPredicate = (data:processTable, filter:string) :boolean => {
      let searchString = JSON.parse(filter);
      let getWaterTemp = data.SensorDataWaterTemp.toString().trim().toLowerCase().indexOf(searchString.SensorDataWaterTemp.toLowerCase()) !== -1
      let getDataPump10 = data.SensorDataPump10.toString().trim().indexOf(searchString.SensorDataPump10) !== -1
      let getDataPump5 = data.SensorDataPump5.toString().trim().indexOf(searchString.SensorDataPump5) !== -1
      let getDrainSensor = data.SensorDataDrainSensor.toString().trim().indexOf(searchString.SensorDataDrainSensor) !== -1
      let getWaterLevel = data.SensorDataWaterLevel.toString().trim().indexOf(searchString.SensorDataWaterLevel) !== -1
      if (searchString.topFilter) {
          return getWaterTemp || getDataPump10 || getDataPump5 || getDrainSensor || getWaterLevel
      } else {
          return getWaterTemp && getDataPump10 && getDataPump5 && getDrainSensor && getWaterLevel
      }
    }
    return myFilterPredicate;
  }
  
}
