import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { UserIndexComponent } from "./user/index/index.component";
import { UserNewComponent } from "./user/new/new.component";
import { UserEditComponent } from "./user/edit/edit.component";
import { UserShowComponent } from "./user/show/show.component";

import { TestIndexComponent } from "./test/index/index.component";
import { TestNewComponent } from "./test/new/new.component";
import { TestEditComponent } from "./test/edit/edit.component";
import { TestShowComponent } from "./test/show/show.component";

import {routing} from "./app.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {ApiService} from "./service/api.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./core/interceptor";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserIndexComponent,
    UserNewComponent,
    UserEditComponent,
    UserShowComponent,
    TestIndexComponent,
    TestNewComponent,
    TestEditComponent,
    TestShowComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ApiService, {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }