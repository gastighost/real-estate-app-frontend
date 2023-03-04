import { useEffect, useState } from "react";

import api from "@/common/api";
import PropertiesList from "../../components/properties/PropertiesList";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<any>([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await api.getProperties();

        setProperties(response.data.properties);
      } catch (error) {
        console.log(error);
      }
    };

    getProperties();
  }, []);

  return <PropertiesList properties={properties} />;
};

export default PropertiesPage;
