import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";

import { getProperties, selectProperty } from "@/store/properties";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "react-hot-toast";
import api from "@/common/api";

import styles from "./property-styles.module.css";

interface PropertyProps {
  property: any;
  activateProperty: (propertyId: string) => void;
  deactivateProperty: () => void;
  activeProperty: string;
}

const Property = ({
  property,
  activateProperty,
  deactivateProperty,
  activeProperty,
}: PropertyProps) => {
  const [propertyForDeletion, setPropertyForDeletion] = useState<string | null>(
    null
  );

  const dispatch = useDispatch<AppDispatch>();

  const selectedProperty = useSelector(
    (store: RootState) => store.properties.property
  );

  const cardStyle = {
    boxShadow: "0 1px 2px rgb(0 0 0 / 20%)",
    borderRadius: "12px",
    overflow: "hidden",
    maxWidth: "345px",
    margin: "16px",
  };

  const mediaStyle = {
    height: "200px",
  };

  const contentStyle = {
    padding: "16px 20px",
  };

  const price = new Intl.NumberFormat().format(property.price);

  const isActive = property.id === activeProperty;

  const deleteProperty = async (id: string) => {
    try {
      const response = await api.deleteProperty(id);
      console.log(response);

      setPropertyForDeletion(null);
      dispatch(getProperties());

      toast.success("Successfully deleted property!");
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  return (
    <Fragment>
      <Grid
        item
        key={property.id}
        onClick={() => {
          activateProperty(property.id);
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
      <Dialog
        onClose={() => {
          deactivateProperty();
          dispatch(selectProperty({}));
        }}
        open={isActive}
      >
        <DialogTitle>{selectedProperty.name}</DialogTitle>
        <DialogContent>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`${selectedProperty.houseNumber} ${selectedProperty.street}`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {`${selectedProperty.suburb}, ${selectedProperty.zipcode}`}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" component="p">
                    {`${
                      selectedProperty.sellStatus === "SALE"
                        ? "On sale for"
                        : ""
                    } $${price} ${
                      selectedProperty.sellStatus === "RENT" ? "per month" : ""
                    }`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <BedIcon fontSize="small" />
                    {`${selectedProperty.rooms} bedrooms`}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <WcIcon fontSize="small" />
                    {`${selectedProperty.bathrooms} bathrooms`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPropertyForDeletion(selectedProperty.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={() => {
              deactivateProperty();
              dispatch(selectProperty({}));
            }}
          >
            Close
          </Button>
        </DialogActions>
        <Dialog
          open={!!propertyForDeletion}
          onClose={() => setPropertyForDeletion(null)}
          style={{ padding: "20px" }}
        >
          <div className={styles.deleteModal}>
            <Typography>Are you sure you want to delete this</Typography>
            <div className={styles.buttonGroup}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (propertyForDeletion) deleteProperty(propertyForDeletion);
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setPropertyForDeletion(null)}
              >
                No
              </Button>
            </div>
          </div>
        </Dialog>
      </Dialog>
    </Fragment>
  );
};

export default Property;
