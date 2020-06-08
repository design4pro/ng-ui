import { Component } from '@angular/core';
import { Styled } from '@design4pro/ng-jss';

@Component({
  selector: 'ng-ui-root',
  templateUrl: './app.component.html',
  styleUrls: [
    /*'./app.component.scss'*/
  ],
})
@Styled<AppComponent>(({ component, css }) => {
  return css({
    root: { color: `${component.color}` },
  });
})
export class AppComponent {
  title = 'ng-ui-app';

  color = 'red';

  click() {
    this.color = this.color === 'red' ? 'green' : 'red';
  }
}
