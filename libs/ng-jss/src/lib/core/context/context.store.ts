import { Injectable } from '@angular/core';
import { Store } from '../utils/store';
import { ContextState } from './context-state';

@Injectable()
export class ContextStore extends Store<ContextState> {
  private static instance: ContextStore;

  constructor() {
    super(new ContextState());
  }

  static getInstance(): ContextStore {
    if (!ContextStore.instance) {
      ContextStore.instance = new ContextStore();
    }

    return ContextStore.instance;
  }
}
