import { Styles } from './styled.interface';

interface Theme {}

const createUseStyles = <Theme>(
  styles: Styles<Theme>,
  options?: HookOptions<Theme> = {}
) => {};
