import memoize from 'fast-memoize';
import { manageSheet } from '../../jss/managers';
import { HookOptions, Styles } from '../../jss/types';
import getSheetClasses from '../../jss/utils/get-sheet-classes';
import getSheetIndex from '../../jss/utils/get-sheet-index';
import { addDynamicRules, createStyleSheet } from '../../jss/utils/sheets';
import { ContextState } from '../context/context-state';
import { ContextStore } from '../context/context.store';
import { ThemeState } from '../theme/theme-state';
import { ThemeStore } from '../theme/theme.store';

const createUseStyles = (
  styles: Styles<ThemeState>,
  options: HookOptions<ThemeState> = {}
) => {
  const { index = getSheetIndex(), theming, name, ...sheetOptions } = options;
  const context: ContextState = ContextStore.getInstance().state;
  const theme: ThemeState = ThemeStore.getInstance().state;

  return (data: any): Record<string, string> => {
    console.log({ context, theme });
    const [sheet, dynamicRules] = memoize(
      (_context: ContextState, _theme: ThemeState) => {
        const newSheet = createStyleSheet<ThemeState>({
          context: _context,
          styles,
          name,
          theme: _theme,
          index,
          sheetOptions,
        });

        const newDynamicRules = newSheet
          ? addDynamicRules(newSheet, data)
          : null;

        if (newSheet) {
          manageSheet<ThemeState>({
            index,
            context: _context,
            sheet: newSheet,
            theme: _theme,
          });
        }

        return [newSheet, newDynamicRules];
      }
    )(context, theme);

    const classes =
      sheet && dynamicRules ? getSheetClasses(sheet, dynamicRules) : {};

    return classes;
  };
};

export default createUseStyles;
