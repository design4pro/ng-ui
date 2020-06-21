import {
  ɵComponentDef as ComponentDef,
  ɵComponentType as ComponentType,
  ɵDirectiveDef as DirectiveDef,
  ɵDirectiveType as DirectiveType,
  ɵNG_COMP_DEF,
  ɵNG_DIR_DEF,
} from '@angular/core';

// This is done for type-safety and to make compiler happy
// because definition property names are exported as `string`,
// thus it throws `ɵNG_COMP_DEF can't be used to index type 'ɵComponentType<T>'.`
const NG_DIR_DEF = ɵNG_DIR_DEF as 'ɵdir';
const NG_COMP_DEF = ɵNG_COMP_DEF as 'ɵcmp';

// As directive and component definitions are considered private API,
// so those properties are prefixed with Angular's marker for "private".
export function getDef<T>(
  type: ComponentType<T> | DirectiveType<T>
): DirectiveDef<T> | ComponentDef<T> {
  return (
    (type as ComponentType<T>)[NG_COMP_DEF] ||
    (type as DirectiveType<T>)[NG_DIR_DEF]
  );
}

export function getDefName<T>(type: ComponentType<T> | DirectiveType<T>) {
  if (type.hasOwnProperty(NG_COMP_DEF)) {
    return NG_COMP_DEF;
  } else {
    return NG_DIR_DEF;
  }
}
