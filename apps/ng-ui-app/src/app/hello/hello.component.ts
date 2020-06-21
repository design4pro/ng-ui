import { Component, Input } from '@angular/core';
import { Styled } from '@design4pro/ng-jss';

@Styled(({ css }) =>
  css({
    root: {
      color: 'blue',
    },
  })
)
@Component({
  selector: 'hello',
  template: `<span [ngClass]="classes.root">Hello {{ name }}</span>`,
})
export class HelloComponent {
  classes: any;

  @Input()
  name: string;
}
