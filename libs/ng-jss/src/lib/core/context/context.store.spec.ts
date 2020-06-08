import { TestBed } from '@angular/core/testing';
import { ContextStore } from './context.store';

describe('ContextStore', () => {
  let store: ContextStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextStore],
    });

    store = new ContextStore();
    store.setState({
      disableStylesGeneration: false,
    });
  });

  it('should disable styles generation', () => {
    expect(store.state.disableStylesGeneration).toBe(false);
  });
});
