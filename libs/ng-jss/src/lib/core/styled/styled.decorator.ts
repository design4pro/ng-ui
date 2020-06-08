import createUseStyles from './create-use-styles';
import { StyledProps } from './styled.interface';
const HOOKS = ['ngDoCheck'];
export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const PROP_METADATA = '__prop__metadata__';

function generateStyles<C>(styleFn: StyledProps<C>) {
  console.log(styleFn);

  const useStyles = styleFn({
    component: this,
    css: createUseStyles,
  });

  console.log({ useStyles }, useStyles(), this);

  this.classes = useStyles();
}
export function Styled<C>(props: StyledProps<C>) {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    HOOKS.forEach((hook) => {
      const originalHook = constructor.prototype[hook];

      Object.defineProperty(constructor, 'classes', {
        writable: true,
      });

      const annotations = constructor.hasOwnProperty(ANNOTATIONS)
        ? (constructor as any)[ANNOTATIONS]
        : Object.defineProperty(constructor, ANNOTATIONS, { value: [] })[
            ANNOTATIONS
          ];
      console.log({ annotations });

      const parameters = constructor.hasOwnProperty(PARAMETERS)
        ? (constructor as any)[PARAMETERS]
        : Object.defineProperty(constructor, PARAMETERS, { value: [] })[
            PARAMETERS
          ];
      console.log({ parameters });

      const meta = constructor.hasOwnProperty(PROP_METADATA)
        ? (constructor as any)[PROP_METADATA]
        : Object.defineProperty(constructor, PROP_METADATA, { value: {} })[
            PROP_METADATA
          ];
      meta['classes'] =
        (meta.hasOwnProperty('classes') && meta['classes']) || [];

      console.log({ meta });

      constructor.prototype[hook] = function (...args: any) {
        generateStyles.apply(<C>this, [props]);

        if (originalHook) originalHook.apply(this, args);
      };
    });
  };
}
