import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import PropertiesList from "../../components/properties/PropertiesList";
import { getProperties } from "../../store/properties";

const PropertiesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { properties } = useSelector((store: RootState) => store.properties);

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  return <PropertiesList properties={properties} />;
};

export default PropertiesPage;
