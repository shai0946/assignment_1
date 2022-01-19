// tslint:disable
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProcessComponent } from './process.component';
import { ProcessService } from './service/process.service';

@Injectable()
class MockProcessService {}

describe('ProcessComponent', () => {
  let fixture: ComponentFixture<ProcessComponent>;
  let component: ProcessComponent;
  let processService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ ProcessService ]
    }).compileComponents();
  });

  beforeEach(inject([ProcessService],(s)=>{
    processService = s;
    spyOn(processService,'getProcessData').and.returnValue(of([getFakegetProcessData(),getFakegetProcessData()]));
    fixture = TestBed.createComponent(ProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }))

  afterEach(() => {
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    const response = getFakegetProcessData();
    component.ngOnInit();
    fixture.detectChanges();
    expect(processService.getProcessData).toHaveBeenCalled();
  });

  it('should run #getProcessData()', async () => {
    component.getProcessData();
    expect(processService.getProcessData).toHaveBeenCalled();
    expect(component.processList.length).toEqual(1);
    expect(component.processes.length).toEqual(2);
    expect(Object.keys(component.transformedData[0]).length).toEqual(14);
  });

  it('should run #buttonClick()', async () => {
    component.buttonClick({
      target: {
        textContent: {}
      }
    });
    component.buttonClick(event);
    component.step = 'Customer';
    fixture.detectChanges();
    expect(component.processList.length).toEqual(1);

    component.step = 'Process';
    fixture.detectChanges();
    expect(component.processList[0]).toEqual('WashDisWash');
  });

  it('should run #tabChangeEvent()', async () => {
    component.transformedJSON = component.transformedJSON || {};
    component.tabChangeEvent('All',0)
    fixture.detectChanges();
    expect(component.transformedData.length).toEqual(2);
  });

  function getFakegetProcessData(){
    return {
        "CustomerId": "3123",
        "CustomerName": "UMC Utrecht U",
        "MachineNr": "UMC-342",
        "MachineId": "21",
        "MachineTypeSerial": "EWD220;338198304139 01",
        "Process": "WashDisWash",
        "ProcessTime": {
            "Start": "2019-13-02 21:13:11.328",
            "End": "2019-13-02 22:03:00.327"
        },
        "SensorData": {
            "WaterTemp": "celcius:23",
            "Pump10": "off",
            "Pump5": "on",
            "DrainSensor": "off",
            "WaterLevel": "ml-432"
        },
        "OnlineFrom": "27-07-2014 10:02:37"
    }
  }

});
