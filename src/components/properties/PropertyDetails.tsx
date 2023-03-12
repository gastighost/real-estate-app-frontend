import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import WcIcon from "@mui/icons-material/Wc";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import StraightenIcon from "@mui/icons-material/Straighten";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import toast from "react-hot-toast";

import { AppDispatch, RootState } from "@/store/store";
import DeletePropertyModal from "./DeletePropertyModal";
import EditPropertyForm from "./EditPropertyForm";
import { getProperties, selectProperty } from "@/store/properties";
import { PropertyProps } from "./Property";
import api from "@/common/api";

const PropertyDetails = ({ property }: PropertyProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProperty = useSelector(
    (store: RootState) => store.properties.property
  );

  const [propertyForDeletion, setPropertyForDeletion] = useState<string | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const price = new Intl.NumberFormat().format(property.price);
  const isActive = property.id === selectedProperty.id;

  const activateEditing = () => {
    setIsEditing(true);
  };

  const deactivateEditing = () => {
    setIsEditing(false);
  };

  const deleteProperty = async (id: string) => {
    try {
      await api.deleteProperty(id);

      setPropertyForDeletion(null);
      dispatch(getProperties({}));

      toast.success("Successfully deleted property!");
    } catch (error) {
      toast.error("Failed to delete property");
    }
  };

  return (
    <Dialog
      onClose={() => {
        dispatch(selectProperty({}));
      }}
      open={isActive}
    >
      <DialogTitle className="font-sans subpixel-antialiased text-xl">
        {selectedProperty.name}
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={10}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  fontWeight="bold"
                >
                  Property type:{" "}
                  {selectedProperty.type &&
                    selectedProperty.type?.charAt(0).toUpperCase() +
                      selectedProperty.type?.slice(1).toLowerCase()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${selectedProperty.houseNumber} ${selectedProperty.street}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${selectedProperty.suburb}, ${selectedProperty.zipcode}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="h6" component="p">
                  {`${
                    selectedProperty.sellStatus === "SALE" ? "On sale for" : ""
                  } $${price} ${
                    selectedProperty.sellStatus === "RENT" ? "per month" : ""
                  }`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="flex"
                  alignContent="center"
                  my={1}
                >
                  <BedIcon fontSize="small" sx={{ mr: 2 }} />
                  {`${selectedProperty.rooms} bedrooms`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="flex"
                  alignContent="center"
                  my={1}
                >
                  <WcIcon fontSize="small" sx={{ mr: 2 }} />
                  {`${selectedProperty.bathrooms} bathrooms`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="flex"
                  alignContent="center"
                  my={1}
                >
                  <ChangeHistoryIcon fontSize="small" sx={{ mr: 2 }} />
                  {`${selectedProperty.floors} floors`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="flex"
                  alignContent="center"
                  my={1}
                >
                  <StraightenIcon fontSize="small" sx={{ mr: 2 }} />
                  {`${selectedProperty.sqm} sqm`}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="flex"
                  alignContent="center"
                  my={1}
                >
                  <AttachMoneyIcon fontSize="small" sx={{ mr: 2 }} />
                  {`FOR ${selectedProperty.sellStatus}`}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  display="flex"
                  alignContent="center"
                  my={1}
                >
                  <LocalParkingIcon fontSize="small" sx={{ mr: 2 }} />
                  {selectedProperty.parking
                    ? "Parking Available"
                    : "No Parking"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <Box display="flex" justifyContent="space-around">
        <DialogActions>
          <Button
            onClick={() => {
              activateEditing();
            }}
          >
            Edit
          </Button>
        </DialogActions>
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
              dispatch(selectProperty({}));
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Box>
      <EditPropertyForm
        isEditing={isEditing}
        deactivateEditing={deactivateEditing}
      />
      <DeletePropertyModal
        propertyForDeletion={propertyForDeletion}
        setPropertyForDeletion={setPropertyForDeletion}
        deleteProperty={deleteProperty}
      />
    </Dialog>
  );
};

export default PropertyDetails;
