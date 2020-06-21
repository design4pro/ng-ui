import { Component } from '@angular/core';
import { Styled, styledProp } from '@design4pro/ng-jss';

@Styled(({ css }) =>
  css(
    (theme) => ({
      root: {
        color: (data) => data.color,
        direction: theme.direction,
        [theme.breakpoints.down('l')]: {
          backgroundColor: 'red',
        },
      },
    }),
    { name: 'app' }
  )
)
@Component({
  selector: 'ng-ui-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  classes: any;
  title = 'ng-ui-app';
  name: string;

  @styledProp
  color = 'red';

  click() {
    this.color = this.color === 'red' ? 'green' : 'red';
    this.name = this.color;
  }
}
