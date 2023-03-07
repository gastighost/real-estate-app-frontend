import { useEffect, ReactNode, Fragment } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { getLoggedInUser } from "@/store/users";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url !== "/login") {
        dispatch(getLoggedInUser());
      }
    };

    if (router.asPath === router.route) {
      handleRouteChange(router.asPath);
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, dispatch]);

  return <Fragment>{children}</Fragment>;
};

export default RouteGuard;
