import { JssContext, JssStore } from '../jss/jss-context';

export function useJss(): JssContext {
  return JssStore.getInstance().state;
}

export default useJss;
