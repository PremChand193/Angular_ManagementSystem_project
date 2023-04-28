import { Component ,OnDestroy,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit,OnDestroy{
  submitted=false
  registerForm!: FormGroup;
  subscription!:Subscription;
  constructor(private _http:HttpService,private _formBuilder:FormBuilder){

  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.registerForm=this._formBuilder.group({
      userName:[null,Validators.required],
      email:[null,Validators.required],
      phoneNumber:[null,Validators.required],
      password:[null,Validators.required]  
    });
  }

  public get f() : any {
    return this.registerForm.controls;
  }
  
  public registerDetails(){
    this.submitted=true;
    this.subscription=this._http.postData("https://testapi.skilllens.com/api/Accounts",this.registerForm.value).subscribe({
      next:(data:any)=>{
        console.log(data)
      },
      error:(reason:any)=>{
        console.log(reason)
      },
      complete:()=>
      {
        console.log()
      }
    })
  }
  public resetDetails(){

    this.registerForm.reset();
    this.submitted=false;
  }
}
