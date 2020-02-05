import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserIndexComponent } from "./user/index/index.component";
import { UserNewComponent } from "./user/new/new.component";
import { UserEditComponent } from "./user/edit/edit.component";
import { UserShowComponent } from "./user/show/show.component";

const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'users', component : UserIndexComponent },
  { path : 'users/new', component : UserNewComponent },
  { path : 'users/:id/edit', component : UserEditComponent }
  { path : 'users/:id', component : UserShowComponent }
];

export const routing = RouterModule.forRoot(routes);