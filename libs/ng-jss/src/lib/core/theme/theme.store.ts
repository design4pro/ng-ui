import { Injectable } from '@angular/core';
import { Store } from '../utils/store';
import { ThemeState } from './theme-state';

@Injectable()
export class ThemeStore extends Store<ThemeState> {
  private static instance: ThemeStore;

  constructor() {
    super(new ThemeState());
  }

  static getInstance(): ThemeStore {
    if (!ThemeStore.instance) {
      ThemeStore.instance = new ThemeStore();
    }

    return ThemeStore.instance;
  }
}
