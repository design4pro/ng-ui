import {
  ɵComponentDef as ComponentDef,
  ɵDirectiveDef as DirectiveDef,
} from '@angular/core';

/**
 * Applied to definitions and informs that class is decorated
 */
const DECORATOR_APPLIED: unique symbol = Symbol('__styledDecoratorApplied');

export function missingDecorator<T>(
  providerOrDef: ComponentDef<T> | DirectiveDef<T>
): boolean {
  return !(providerOrDef as any)[DECORATOR_APPLIED];
}

export function markAsDecorated<T>(
  providerOrDef: ComponentDef<T> | DirectiveDef<T>
): void {
  (providerOrDef as any)[DECORATOR_APPLIED] = true;
}
