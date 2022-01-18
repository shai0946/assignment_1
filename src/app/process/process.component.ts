import { Component, OnInit } from '@angular/core';
import { processTable } from './Model/model';
import { ProcessService } from './service/process.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {
  processes: any[] = [];
  processList: Array<string> = [] ;
  transformedData: processTable[] = [];
  transformedJSON: processTable[] = [];
  step: string = 'Process';
  isSensorAnalysis: boolean = true;
  tabIndex: number = 0;

  constructor(public processService: ProcessService) { }

  ngOnInit(): void{
    this.getProcessData();
  }

  //Get Process data using service module
  getProcessData(): void{
    this.processService.getProcessData().subscribe(data =>{
      this.processes = data;
      this.filterUniqueProcessList(this.processes, 'Process');
      this.transformedJSON = this.transformNestedJson(this.processes);
      this.transformedData = this.transformedJSON;
    });
  }

  //Get all unique sorted process list for dynamic tabs
  filterUniqueProcessList(processes: any[], filterCol: string): void{
    this.processList = processes.map(element => element[filterCol]);
    this.processList = [...new Set(this.processList)].sort();
  }

  //transform nested JSON into required Tabular format
  transformNestedJson(dataSet: any[]): processTable[] {
    return dataSet.map(element=>{
      return {
        "CustomerId": element.CustomerId,
        "CustomerName": element.CustomerName,
        "MachineNr": element.MachineNr,
        "MachineId":element.MachineId,
        "MachineTypeSerial": element.MachineTypeSerial,
        "Process": element.Process,
        "ProcessTimeStart": element.ProcessTime.Start,
        "ProcessTimeEnd": element.ProcessTime.End,
        "SensorDataWaterTemp": element.SensorData.WaterTemp,
        "SensorDataPump10": element.SensorData.Pump10,
        "SensorDataPump5":element.SensorData.Pump5,
        "SensorDataDrainSensor":element.SensorData.DrainSensor,
        "SensorDataWaterLevel": element.SensorData.WaterLevel,
        "OnlineFrom": element.OnlineFrom,
      }
    })
  }

  // On Analysis button change update the process list and update the table data
  buttonClick(event: any){
    this.step = event.target.textContent;
    if(this.step === 'Process') this.filterUniqueProcessList(this.processes, this.step);
    else if(this.step === 'Customer') this.filterUniqueProcessList(this.processes, 'CustomerName');
    else if(this.step === 'Sensor') this.processList=[];
    let processElement = this.tabIndex-1 >= 0 ? this.processList[this.tabIndex-1]: 'All'; 
    this.tabChangeEvent(processElement,this.tabIndex)
  }

  // On tab change filter the data based on the required tabs
  tabChangeEvent(textLabel: string, Index: number){
    this.tabIndex = Index;
    if(textLabel != 'All'){
      let filterElement = this.step === 'Process' ? 'Process':'CustomerName';
      this.transformedData = this.transformedJSON.filter(element=>element[filterElement] === textLabel)
     }
     else this.transformedData = this.transformedJSON;
  }

}
