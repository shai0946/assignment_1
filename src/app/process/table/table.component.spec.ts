// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TableComponent } from './table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule,
      BrowserAnimationsModule],
      declarations: [ TableComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(TableComponent, {

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnChanges()', async () => {
    component.ngOnChanges();
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
  });

  it('should change filterBy and dataSource.filter', () => {
    const event = { target: { value: '21' } } as any;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('21');
  });

});
