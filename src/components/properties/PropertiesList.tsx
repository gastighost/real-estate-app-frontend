import React from "react";
import { Grid } from "@mui/material";

import Property from "./Property";

const PropertiesList = ({ properties }: { properties: any }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {properties.map((property: any, index: number) => {
        return <Property key={index} property={property} />;
      })}
    </Grid>
  );
};

export default PropertiesList;
