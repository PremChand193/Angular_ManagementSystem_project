import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private _http:HttpService,private _router:Router){

  }
  public logOutPage(){
   if(confirm("logout")){
    localStorage.removeItem('Token');
    this._router.navigate(['/']);
   }
    
   
}
}
