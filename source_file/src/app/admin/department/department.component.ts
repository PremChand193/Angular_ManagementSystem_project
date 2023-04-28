import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { IDepartments } from './department-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit,OnDestroy {
  departments=[] as IDepartments[];
  subsription!:Subscription;
  submitted=false;
  addDeptForm!:FormGroup;

  constructor(private _http:HttpService,private _formBuilder:FormBuilder){
      
  }
  
  public get f(){
    return this.addDeptForm.controls
  }
  
  ngOnDestroy(){
   
  }
  ngOnInit(){

    this.addDeptForm=this._formBuilder.group({
      deptId:0,
      deptName:[null,Validators.required],
      deptLocation:[null,Validators.required]
    })
      this.subsription=this._http.getData("https://testapi.skilllens.com/api/Department").subscribe({
        next:(data:any)=>{
           this.departments=data.data
        },
        error:(reason)=>{
          console.log(reason);
        },
        complete:()=>{
        }
      })
  }
  public addDepartment(addDeptForm:FormGroup){
           this.submitted=true;
           if(this.addDeptForm.invalid){
            return;
           }
           this.subsription=this._http.postData("https://testapi.skilllens.com/api/Department",this.addDeptForm.value).subscribe({
            next:(data:any)=>{
              console.log(data)
            },
            error:(reason)=>{
              console.log(reason)
            },
            complete:()=>{
              alert("details added")
            }

           })
  }

}
