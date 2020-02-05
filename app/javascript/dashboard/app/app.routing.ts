import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserIndexComponent } from "./user/index/index.component";

const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'users', component : UserIndexComponent }
];

export const routing = RouterModule.forRoot(routes);