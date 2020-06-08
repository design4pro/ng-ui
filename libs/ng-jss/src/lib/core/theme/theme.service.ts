import { Injectable } from '@angular/core';
import { ThemeType } from './theme.interface';
import { ThemeStore } from './theme.store';

@Injectable()
export class ThemeService {
  constructor(private store: ThemeStore) {}

  context(theme: ThemeType) {
    this.store.setState({
      theme,
    });

    return this.store;
  }
}
