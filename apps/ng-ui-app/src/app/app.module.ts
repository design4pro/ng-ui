import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgJssModule } from '@design4pro/ng-jss';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [BrowserModule, NgJssModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('ng-ui-app');
  }
}
