import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from "react";

interface Tab {
  title: string;
  function?: () => void;
  list?: {
    title: string;
    function?: () => void;
  }[];
}

interface NavigationProps {
  tabs: Array<Tab>;
  setTabs: Dispatch<SetStateAction<Array<Tab>>>;
}

export const NavigationContext = createContext<NavigationProps | null>(null);

export const TopNavigation = ({children}: {children: ReactNode}) => {
  const [tabs, setTabs] = useState<Array<Tab>>([]);

  const value = useMemo(
    () => ({
      tabs,
      setTabs
    }),
    [tabs]
  );

  return (
    <NavigationContext.Provider value={value}>
      <div className="absolute w-full h-8 bg-slate-300 border-b border-black" />
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const ctx = useContext(NavigationContext);
  if (ctx === undefined) {
    throw new Error("useNavigationContext must be used with TopNavigation");
  }

  return ctx;
};
