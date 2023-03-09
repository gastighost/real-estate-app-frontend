import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";
import { getProperties } from "../../store/properties";

import PropertiesList from "../../components/properties/PropertiesList";
import CreatePropertyForm from "@/components/properties/CreatePropertyForm";
import PropertySearchBar from "@/components/properties/PropertySearchBar";

const PropertiesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { properties } = useSelector((store: RootState) => store.properties);

  useEffect(() => {
    dispatch(getProperties({}));
  }, [dispatch]);

  return (
    <Fragment>
      <PropertySearchBar />
      <PropertiesList properties={properties} />
      <CreatePropertyForm />
    </Fragment>
  );
};

export default PropertiesPage;
