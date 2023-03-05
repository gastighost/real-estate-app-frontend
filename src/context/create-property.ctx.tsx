import { createContext, useCallback, useMemo, useState } from "react";

export const PropertyContext = createContext({
  creatingActive: () => {},
  creatingInactive: () => {},
  isCreating: false,
});

const PropertyCtxProvider = (props: any) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const creatingActive = useCallback(() => {
    setIsCreating(true);
  }, []);

  const creatingInactive = useCallback(() => {
    setIsCreating(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      creatingActive,
      creatingInactive,
      isCreating,
    }),
    [creatingActive, creatingInactive, isCreating]
  );

  return (
    <PropertyContext.Provider value={contextValue}>
      {props.children}
    </PropertyContext.Provider>
  );
};

export default PropertyCtxProvider;
