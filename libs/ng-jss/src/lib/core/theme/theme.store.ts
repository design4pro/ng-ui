import { Injectable } from '@angular/core';
import { Store } from '../utils/store';
import { ThemeState } from './theme-state';

@Injectable()
export class ThemeStore extends Store<ThemeState> {
  constructor() {
    super(new ThemeState());
  }
}
