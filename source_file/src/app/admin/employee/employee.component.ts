import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDepartment, IEmployee } from './employee-model';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit,OnDestroy{
  employees=[] as IEmployee[];
  departments=[] as IDepartment[];
  subscription!: Subscription;
  selected!:any;
  addEmpForm!:FormGroup;
  submitted=false;

  listDept=this.departments.filter(x=>x.deptName)
  constructor(private _http:HttpService,private _formBulider:FormBuilder){

  }

   ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    
   }
   ngOnInit(): void {

    this.addEmpForm=this._formBulider.group({
      empId: 0,
    deptId: [null,Validators.required],
    empName: [null,Validators.required],
    empSalary: [null,Validators.required]
    })
    
    this.subscription=this._http.getData("https://testapi.skilllens.com/api/Employee").subscribe({
      next:(data:any)=>{
        this.employees = data.data;
        console.log(data)
      },
      error:(reason)=>{
        console.log(reason)
      },
      complete:()=>{
   
      }
     })

     this.subscription=this._http.getData("https://testapi.skilllens.com/api/Department").subscribe({
      next:(data:any)=>{
        console.log(data)
        this.departments=data.data
      }
     });
     
   }
   
   public get f() {
    return this.addEmpForm.controls
   }
   
   
   public addEmployee(formGroup:FormGroup){
    this.submitted=true;
    if(this.addEmpForm.invalid){
      return;
    }
    this.subscription=this._http.postData("https://testapi.skilllens.com/api/Employee",this.addEmpForm.value).subscribe({
       next:(data:any)=>{
       },
       error:(reason)=>{
        console.log(reason)
       },
       complete:()=>{
          alert("employee added");
       }
    })
    this.submitted=false;
    this.addEmpForm.reset();
   }
   

   
}
