import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllServiceService {

  constructor(private http:HttpClient) { }


  getCountries():Observable <any>{
    return this.http.get('../assets/CountryList_Json.json');
  }
  getDealers():Observable <any>{
    return this.http.get('../assets/DealerList_Json.json');
  }
  getStates():Observable <any>{
    return this.http.get('../assets/StateList_Json.json');
  }

}
