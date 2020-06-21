import deepmerge from '../utils/deepmerge';
import createBreakpoints from './create-breakpoints';

function createTheme(options: any = {}, ...args: any) {
  const { breakpoints: breakpointsInput = {}, ...other } = options;

  const breakpoints = createBreakpoints(breakpointsInput);

  let theme = deepmerge(
    {
      breakpoints,
      direction: 'ltr',
      overrides: {}, // Inject custom styles
      props: {}, // Provide default props
    },
    other
  );

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}

export default createTheme;
