import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { 

  }
  public getData(url:string){
    let token = localStorage.getItem("Token");
    let httpHeaders = new HttpHeaders().set("Authorization", "bearer " + token);
    return this._http.get(url, { headers: httpHeaders });
  }
  public postData(url:string,obj:any){
    let token = localStorage.getItem("Token");
    let httpHeaders = new HttpHeaders().set("Authorization", "bearer " + token);
    return this._http.post(url,obj, { headers: httpHeaders });
  }
}
