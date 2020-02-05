import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserIndexComponent } from "./user/index/index.component";
import { UserNewComponent } from "./user/new/new.component";

const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'users', component : UserIndexComponent }
  { path : 'users/new', component : UserNewComponent }
];

export const routing = RouterModule.forRoot(routes);