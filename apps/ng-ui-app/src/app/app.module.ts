import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgJssModule } from '@design4pro/ng-jss';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgJssModule.forRoot({
      normalize: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('ng-ui-app');
  }
}
