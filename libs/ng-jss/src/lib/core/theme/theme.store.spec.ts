import { TestBed } from '@angular/core/testing';
import { ThemeStore } from './theme.store';

describe('ThemeStore', () => {
  let store: ThemeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeStore],
    });

    store = new ThemeStore();
    store.setState({
      theme: 'dark',
    });
  });

  it('should them be dark', () => {
    expect(store.state.theme).toBe('dark');
  });
});
