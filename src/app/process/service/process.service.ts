import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) { }

  public getProcessData(): Observable<any>{
    return this.http.get("./assets/json/dataFile.txt");
  }
}
