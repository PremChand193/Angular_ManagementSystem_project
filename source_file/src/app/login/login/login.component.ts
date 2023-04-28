import { Component, OnInit,OnDestroy} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginForm!: FormGroup;
  subscription!: Subscription;
   submitted= false;
  return_url:any;
   constructor(private _http:HttpService,private _formBuilder:FormBuilder,private _router:Router,private _activedRoute:ActivatedRoute){
   }
   

  ngOnInit(): void {
    this.loginForm=this._formBuilder.group(
      {
         username:[null,Validators.required],
         password:[null,Validators.required]   
      })
    this.return_url= this._activedRoute.snapshot.queryParamMap.get("return_url")
    
  }
  public checkDetails(){
    this.submitted=true;
   
    this.subscription = this._http.postData("https://testapi.skilllens.com/api/Accounts/LoginUser", this.loginForm.value).subscribe({
      next: (data:any) => {
      if(data.data==null){
        alert("please enter valid deatils");
      }
      else{
        localStorage.setItem('Token',data.data);
       if(this.return_url)
         this._router.navigate([this.return_url])
         else
        this._router.navigate(['/admin']);
      }
      },
      error: (reason:any) => {
       console.log(reason)
       },
      complete: () => { 
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}

