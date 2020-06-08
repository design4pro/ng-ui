import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgJssModule, SheetsRegistry } from '@design4pro/ng-jss';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgJssModule.forRoot({
      normalize: true,
      registry: new SheetsRegistry()
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
