export const ADMIN_ROUTES =[
{path:'',loadChildren: () => import("../admin/admin.module").then(x => x.AdminModule)}
]