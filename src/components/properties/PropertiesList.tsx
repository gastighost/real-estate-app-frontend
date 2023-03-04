import React, { useState } from "react";
import { Grid } from "@mui/material";

import Property from "./Property";

const PropertiesList = ({ properties }: { properties: any }) => {
  const [activeProperty, setActiveProperty] = useState<string>("");

  const activateProperty = (propertyId: string) => {
    setActiveProperty(propertyId);
  };

  const deactivateProperty = () => {
    setActiveProperty("");
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {properties.map((property: any, index: number) => {
        return (
          <Property
            key={index}
            property={property}
            activateProperty={activateProperty}
            deactivateProperty={deactivateProperty}
            activeProperty={activeProperty}
          />
        );
      })}
    </Grid>
  );
};

export default PropertiesList;
