// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DatatableComponent } from './datatable.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


describe('DatatableComponent', () => {
  let fixture: ComponentFixture<DatatableComponent>;
  let de: DebugElement;
  let component: DatatableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MatFormFieldModule, MatInputModule, MatTableModule  ],
      declarations: [ DatatableComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [ ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #filterSensor()', async () => {

    const filterElement = '22';
    const sensorName = 'SensorDataWaterTemp'
    const stringifyFilter = '{"SensorDataWaterTemp":"22","SensorDataPump10":"","SensorDataPump5":"","SensorDataDrainSensor":"","SensorDataWaterLevel":""}';
    component.filterSensor(filterElement, sensorName);
    expect(component.filteredValues[sensorName]).toEqual('22');
    expect(component.dataSource.filter).toEqual(stringifyFilter);
  });

  it('should test table element', () => {
    fixture.detectChanges();

    const rowDebugElements = de.queryAll(By.css('table tr'));
    expect(rowDebugElements.length).toBe(2);

    const rowHtmlElements = de.nativeElement.querySelectorAll('table th');
    expect(rowHtmlElements.length).toBe(14);
  });


  it('should run #ngOnChanges()', async () => {
    component.ngOnChanges();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);

    fixture.detectChanges();
    const matFormFieldHtmlElements = de.nativeElement.querySelectorAll('mat-form-field input');
    expect(matFormFieldHtmlElements.length).toBe(5);
    
    component.waterTempFilter.valueChanges.subscribe(data =>{
      expect(component.filterSensor).toHaveBeenCalled();
    });

    component.pump10Filter.valueChanges.subscribe(data =>{
      expect(component.filterSensor).toHaveBeenCalled();
    });

    component.pump5Filter.valueChanges.subscribe(data =>{
      expect(component.filterSensor).toHaveBeenCalled();
    });

    component.drainSensorFilter.valueChanges.subscribe(data =>{
      expect(component.filterSensor).toHaveBeenCalled();
    });

    component.WaterLevelFilter.valueChanges.subscribe(data =>{
      expect(component.filterSensor).toHaveBeenCalled();
    });
  });

  xit('test filterfx', () => {
    const app = fixture.debugElement.componentInstance;
    let filterstring = {"SensorDataWaterTemp":"12","SensorDataPump10":"","SensorDataPump5":"","SensorDataDrainSensor":"","SensorDataWaterLevel":""};
    const filterfx =  app.customFilterPredicate();
    expect(filterfx(app.data,  JSON.stringify(filterstring)).SensorDataWaterTemp).toEqual('12');
  });

  it('should call setupfilter() on search',()=>{
    
    let spy1 = spyOn(component, 'customFilterPredicate');
    // let spy2 = spyOn(component.dataSource, 'filterPredicate');
  
    component.customFilterPredicate();
  
    expect(spy1).toHaveBeenCalled();
    // expect(spy2).toHaveBeenCalled();
    expect(component.dataSource.filterPredicate.length).toBeGreaterThan(1);
  });


});
