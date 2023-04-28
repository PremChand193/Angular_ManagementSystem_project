export const LOGIN_ROUTES=[
  {path:'',loadChildren:()=>import("../login/login.module").then(x=>x.LoginModule)}
]