import {
  SimpleChanges,
  ɵComponentType as ComponentType,
  ɵDirectiveType as DirectiveType,
} from '@angular/core';
import 'reflect-metadata';
import { BehaviorSubject, Subject } from 'rxjs';
import { useTheme } from '../hooks/use-theme';
import createUseStyles from './create-use-styles';
import { markAsDecorated, missingDecorator } from './internals';
import { getDef, getDefName } from './ivy';
import { StyledProps } from './styled.interface';

export const STYLED_PROPS = '__styled__props__';

export function styledProp<T = any>(target: any, propertyKey: string) {
  console.log({ target });
  if (!target.hasOwnProperty(STYLED_PROPS)) {
    Object.defineProperty(target, STYLED_PROPS, {
      value: {},
      writable: false,
    });
  }

  let value: T;

  const getter = function () {
    return value;
  };

  const setter = function (newVal: T) {
    target[STYLED_PROPS][propertyKey] = newVal;
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });

  console.log(target, target[STYLED_PROPS]);
}

function generateStyles(
  styleFn: StyledProps,
  doCheck: BehaviorSubject<boolean>,
  onDestroy: BehaviorSubject<boolean>
) {
  const fn = createUseStyles(doCheck, onDestroy);
  const theme = useTheme();

  console.log('generateStyles', this[STYLED_PROPS], theme);

  const useStyles = styleFn({
    css: fn,
  });

  this.classes = useStyles({ ...this[STYLED_PROPS], theme });
}

function decorateNgOnChanges(
  ngOnChanges: ((changes: SimpleChanges) => void) | null | undefined,
  props: StyledProps,
  doCheck$: BehaviorSubject<any>,
  onDestroy$: Subject<undefined>,
  initialized: boolean
) {
  return function (changes: SimpleChanges) {
    // Invoke the original `ngOnChanges` if it exists
    if (ngOnChanges) {
      ngOnChanges.call(this, [changes]);
    }

    if (!initialized) {
      generateStyles.apply(this, [props, doCheck$, onDestroy$]);
      initialized = true;
    }

    doCheck$.next(this[STYLED_PROPS]);
  };
}

function decorateNgOnDestroy(
  ngOnDestroy: (() => void) | null | undefined,
  onDestroy$: Subject<undefined>
) {
  return function (this: any) {
    // Invoke the original `ngOnDestroy` if it exists
    if (ngOnDestroy) {
      ngOnDestroy.call(this);
    }

    onDestroy$.next();
    onDestroy$.complete();
  };
}

/**
 * Some declared components or directives may be compiled asynchronously in JIT,
 * especially those that're lazy-loaded. And thus may have their
 * definition not accessible yet.
 */
function decorateDeclarableJIT<T>(
  type: ComponentType<T> | DirectiveType<T>,
  props: StyledProps
) {
  const defName = getDefName(type);
  // tslint:disable-next-line: no-non-null-assertion
  const getter = Object.getOwnPropertyDescriptor(type, defName)!.get!;
  // tslint:disable-next-line: prefer-const
  let initialized = false;

  Object.defineProperty(type, 'classes', {
    writable: true,
  });

  Object.defineProperty(type, defName, {
    get() {
      const def = getter();

      if (missingDecorator(def)) {
        const doCheck$: BehaviorSubject<any> = new BehaviorSubject({});
        const onDestroy$: Subject<undefined> = new Subject();

        (def as {
          onChanges: (changes: SimpleChanges) => void;
        }).onChanges = decorateNgOnChanges(
          def.onChanges,
          props,
          doCheck$,
          onDestroy$,
          initialized
        );

        (def as { onDestroy: () => void }).onDestroy = decorateNgOnDestroy(
          def.onDestroy,
          onDestroy$
        );

        markAsDecorated(def);
      }

      return def;
    },
  });
}

function decorateDeclarable<T>(
  type: ComponentType<T> | DirectiveType<T>,
  props: StyledProps
) {
  const isJIT = type.hasOwnProperty('__annotations__');

  if (isJIT) {
    decorateDeclarableJIT(type, props);
  } else {
    const def = getDef(type);
    const doCheck$: BehaviorSubject<any> = new BehaviorSubject({});
    const onDestroy$: Subject<undefined> = new Subject();
    // tslint:disable-next-line: prefer-const
    let initialized = false;

    Object.defineProperty(type, 'classes', {
      writable: true,
    });

    (def as {
      onChanges: (changes: SimpleChanges) => void;
    }).onChanges = decorateNgOnChanges(
      def.onChanges,
      props,
      doCheck$,
      onDestroy$,
      initialized
    );

    (def as { onDestroy: () => void }).onDestroy = decorateNgOnDestroy(
      def.onDestroy,
      onDestroy$
    );

    markAsDecorated(def);
  }
}

export function Styled(props: StyledProps): ClassDecorator {
  return (target: any) => {
    decorateDeclarable(target, props);
  };
}
