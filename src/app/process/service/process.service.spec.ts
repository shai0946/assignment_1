import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, of, throwError } from 'rxjs';

import { ProcessService } from './process.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcessComponent } from '../process.component';

describe('ProcessService', () => {


  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let processService: ProcessService;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    processService = new ProcessService(httpClientSpy);
  });

  it('should run #getProcessData()', (done: DoneFn) => {
    const processDataElement = getFakeProcessData();
    const processData = [processDataElement];

    httpClientSpy.get.and.returnValue(of(processData));
    processService.getProcessData().subscribe(res => {
    expect(res).toEqual(processData)
    done();
  });
  });

  function getFakeProcessData(){
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
