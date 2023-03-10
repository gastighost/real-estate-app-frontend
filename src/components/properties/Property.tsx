import { Fragment } from "react";
import { useDispatch } from "react-redux";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import { selectProperty } from "@/store/properties";
import { AppDispatch } from "@/store/store";

import PropertyDetails from "./PropertyDetails";

export interface PropertyProps {
  property: any;
}

const Property = ({ property }: PropertyProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const cardStyle = {
    boxShadow: "0 1px 2px rgb(0 0 0 / 20%)",
    borderRadius: "12px",
    overflow: "hidden",
    maxWidth: "300px",
    minWidth: "300px",
    margin: "16px",
  };

  const mediaStyle = {
    height: "200px",
  };

  const contentStyle = {
    padding: "16px 20px",
  };

  const price = new Intl.NumberFormat().format(property.price);

  return (
    <Fragment>
      <Grid
        item
        key={property.id}
        onClick={() => {
          dispatch(selectProperty(property));
        }}
      >
        <Card style={cardStyle}>
          <CardActionArea>
            <CardMedia
              style={mediaStyle}
              image={
                property.photoUrl ||
                "https://media.istockphoto.com/id/1130833057/photo/close-up-real-estate-agent-with-house-model-hand-putting-signing-contract-have-a-contract-in.jpg?b=1&s=612x612&w=0&k=20&c=xK6M2L0VmHO0DVpjUuRtHC1pJslGJ7n67kXxl1-frco="
              }
              title={property.name}
            />
            <CardContent style={contentStyle}>
              <Typography gutterBottom variant="h5" component="h2">
                {property.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${property.rooms} bedrooms • ${property.bathrooms} bathrooms`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${property.houseNumber} ${property.street}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {`${property.suburb}, ${property.zipcode}`}
              </Typography>
              <Typography variant="h6" component="p">
                {`${
                  property.sellStatus === "SALE" ? "On sale for" : ""
                } $${price} ${
                  property.sellStatus === "RENT" ? "per month" : ""
                }`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <PropertyDetails property={property} />
    </Fragment>
  );
};

export default Property;
