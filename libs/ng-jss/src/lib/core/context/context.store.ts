import { Injectable } from '@angular/core';
import { Store } from '../utils/store';
import { ContextState } from './context-state';

@Injectable()
export class ContextStore extends Store<ContextState> {
  constructor() {
    super(new ContextState());
  }
}
