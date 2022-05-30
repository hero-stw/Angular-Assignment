import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ClientComponent } from './layout/client/client.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ComponentComponent } from './component/component.component';
import { UsersComponent } from './component/users/users.component';
import { AsideComponent } from './component/aside/aside.component';
import { ListComponent } from './component/users/list/list.component';
import { FormComponent } from './component/users/form/form.component';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './container/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ClientComponent,
    AdminComponent,
    ComponentComponent,
    UsersComponent,
    AsideComponent,
    ListComponent,
    FormComponent,
    ContainerComponent,
    HomeComponent,
    FooterComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
