import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserIndexComponent } from "./user/index/index.component";
import { UserNewComponent } from "./user/new/new.component";
import { UserEditComponent } from "./user/edit/edit.component";
import { UserShowComponent } from "./user/show/show.component";

import { TestIndexComponent } from "./test/index/index.component";
import { TestNewComponent } from "./test/new/new.component";
import { TestEditComponent } from "./test/edit/edit.component";
import { TestShowComponent } from "./test/show/show.component";

const routes: Routes = [
  { path : '', component : LoginComponent },
  { path : 'users', component : UserIndexComponent },
  { path : 'users/new', component : UserNewComponent },
  { path : 'users/:id/edit', component : UserEditComponent },
  { path : 'users/:id', component : UserShowComponent },
  { path : 'tests', component : TestIndexComponent },
  { path : 'tests/new', component : TestNewComponent },
  { path : 'tests/:id/edit', component : TestEditComponent }
  { path : 'tests/:id', component : TestShowComponent }
];

export const routing = RouterModule.forRoot(routes);