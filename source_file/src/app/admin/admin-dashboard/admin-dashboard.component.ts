import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { IDepartment } from './admin-dashboard-model';
import { IDashboardData } from './dashboard-model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit,OnDestroy{
  departments=[] as IDepartment[];
  empDepartments=[] as IDepartment[];
  subscription!:Subscription;
  design=new Array<number>();

  dashbordData = [] as IDashboardData[];
  dbData={} as IDashboardData;

  constructor(private _http:HttpService){

  }
  ngOnDestroy(): void {
     
  }
  ngOnInit(): void {
    this.subscription=this._http.getData("https://testapi.skilllens.com/api/Department").subscribe({
      next:(data:any)=>{
           this.departments=data.data
           for(let i=1;i<this.departments.length;i++){
            this.subscription=this._http.getData(`https://testapi.skilllens.com/api/Employee/EmpDetailsByDept?Id=${i}`).subscribe({
              next:(data:any)=>{
                this.design=data.data.length;
                this.dbData={deptId:this.departments[i].deptId, deptName:this.departments[i].deptName, deptLocation:this.departments[i].deptLocation, numberOfEmployees:data.data.length};
                this.dashbordData.push(this.dbData);
              },
              error:(reason)=>{
                console.log(reason)
              },
              complete:()=>{
              }
        })
          }

      },
      error:(reason)=>{
        console.log(reason)
      },
      complete:()=>{
       
      }
    })


   
  }


}
