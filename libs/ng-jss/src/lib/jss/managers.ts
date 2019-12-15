import { SheetsManager } from 'jss';

type Options<Theme> = {
  sheet: StyleSheet;
  index: number;
  theme: Theme;
};

const defaultManagers = new Map();

export const getManager = (managerId: number) => {
  let manager = defaultManagers.get(managerId);

  if (!manager) {
    manager = new SheetsManager();
    defaultManagers.set(managerId, manager);
  }

  return manager;
};

export const manageSheet = <Theme>(options: Options<Theme>) => {
  const { sheet, index, theme } = options;
  if (!sheet) {
    return;
  }

  const manager = getManager(index);
  manager.manage(theme);
};

export const unmanageSheet = <Theme>(options: Options<Theme>) => {
  if (!options.sheet) {
    return;
  }

  const manager = getManager(options.index);

  manager.unmanage(options.theme);
};
