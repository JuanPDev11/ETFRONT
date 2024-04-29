import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

//MODULES
import { SharedModule } from './shared/shared.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUpdateTaskComponent } from './components/create-update-task/create-update-task.component';
import { AnalistTasksComponent } from './components/analist-tasks/analist-tasks.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { jwtInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddSenderComponent } from './components/add-sender/add-sender.component';
import { IndexUsersComponent } from './components/index-users/index-users.component';
import { IndexSendersComponent } from './components/index-senders/index-senders.component';


@NgModule({
  declarations: [
    AppComponent,
    ListTasksComponent,
    CreateUpdateTaskComponent,
    AnalistTasksComponent,
    DialogContentComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SupervisorComponent,
    AddUserComponent,
    AddSenderComponent,
    IndexUsersComponent,
    IndexSendersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
