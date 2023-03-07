import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "@/common/api";
import { selectProperty } from "@/store/properties";
import { RootState } from "@/store/store";
import { useState } from "react";

const StyledFormControlLabel = styled(FormControlLabel)({
  marginTop: 20,
});

interface EditPropertyFormProps {
  isEditing: boolean;
  deactivateEditing: () => void;
}

const EditPropertyForm = (props: EditPropertyFormProps) => {
  const { isEditing, deactivateEditing } = props;
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { property } = useSelector((store: RootState) => store.properties);

  const [isChecked, setIsChecked] = useState<boolean>(
    property.parking || false
  );

  const onSubmit = async (data: any) => {
    try {
      const {
        name,
        photoUrl,
        houseNumber,
        street,
        suburb,
        zipcode,
        sellStatus,
        price,
        currency,
        rooms,
        bathrooms,
        parking,
        floors,
        sqm,
        type,
      } = data;

      const response = await api.editProperty(property.id, {
        name,
        photoUrl: photoUrl === "" ? null : photoUrl,
        houseNumber: Number(houseNumber),
        street,
        suburb,
        zipcode: Number(zipcode),
        sellStatus,
        price: Number(price),
        currency,
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        parking: isChecked,
        floors: Number(floors),
        sqm: Number(sqm),
        type,
      });

      toast.success(response.data.message);

      reset();
      dispatch(selectProperty(response.data.property));
      deactivateEditing();
    } catch (error: any) {
      toast.error(error.data.error);
    }
  };

  return (
    <Dialog open={isEditing} onClose={deactivateEditing}>
      <Paper style={{ padding: 16, margin: "auto", maxWidth: 500 }}>
        <Typography variant="h5" style={{ marginBottom: 16 }}>
          Create a property
        </Typography>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue={property.name || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Property Name"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="photoUrl"
                control={control}
                defaultValue={property.photoUrl || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Photo Url"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="type"
                control={control}
                defaultValue={property.type || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Property Type"
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: 8, marginBottom: 8 }}
                  >
                    {["HOUSE", "APARTMENT", "COMMERCIAL"].map(
                      (propertyType) => (
                        <MenuItem key={propertyType} value={propertyType}>
                          {propertyType.charAt(0).toUpperCase() +
                            propertyType.slice(1).toLowerCase()}
                        </MenuItem>
                      )
                    )}
                  </Select>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="houseNumber"
                control={control}
                defaultValue={property.houseNumber || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="House number"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="street"
                control={control}
                defaultValue={property.street || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Street"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="suburb"
                control={control}
                defaultValue={property.suburb || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Suburb"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="zipcode"
                control={control}
                defaultValue={property.zipcode || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Zipcode"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="price"
                control={control}
                defaultValue={property.price || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Price"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="currency"
                control={control}
                defaultValue={property.currency || ""}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Currency"
                    fullWidth
                    variant="outlined"
                    style={{ marginTop: 8, marginBottom: 8 }}
                  >
                    {["PHP", "USD", "EUR"].map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="rooms"
                control={control}
                defaultValue={property.rooms || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Rooms"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="bathrooms"
                control={control}
                defaultValue={property.bathrooms || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Bathrooms"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="floors"
                control={control}
                defaultValue={property.floors || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Floors"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="sqm"
                control={control}
                defaultValue={property.sqm || ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Square meters"
                    fullWidth
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledFormControlLabel
                control={
                  <Controller
                    name="parking"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={isChecked}
                        color="primary"
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                    )}
                  />
                }
                label="Parking"
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="sellStatus"
                control={control}
                defaultValue={property.sellStatus || ""}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    aria-label="sellStatus"
                    name="sellStatus"
                    style={{ marginTop: 8, marginBottom: 8 }}
                  >
                    <FormControlLabel
                      value="SALE"
                      control={<Radio />}
                      label="Sale"
                    />
                    <FormControlLabel
                      value="RENT"
                      control={<Radio />}
                      label="Rent"
                    />
                  </RadioGroup>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Dialog>
  );
};

export default EditPropertyForm;
