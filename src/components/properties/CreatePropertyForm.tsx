import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
  Dialog,
  RadioGroup,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { PropertyContext } from "@/context/create-property.ctx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import api from "@/common/api";
import { getProperties } from "@/store/properties";

const StyledFormControlLabel = styled(FormControlLabel)({
  marginTop: 20,
});

const CreatePropertyForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { control, handleSubmit, reset } = useForm();

  const { isCreating, creatingInactive } = useContext(PropertyContext);

  const onSubmit = async (data: any) => {
    try {
      const {
        name,
        houseNumber,
        street,
        suburb,
        zipcode,
        sellStatus,
        price,
        rooms,
        bathrooms,
        parking,
        floors,
        sqm,
      } = data;

      const response = await api.createProperty({
        name,
        houseNumber: Number(houseNumber),
        street,
        suburb,
        zipcode: Number(zipcode),
        sellStatus,
        price: Number(price),
        rooms: Number(rooms),
        bathrooms: Number(bathrooms),
        parking,
        floors: Number(floors),
        sqm: Number(sqm),
      });

      toast.success(response.data.message);

      reset();
      creatingInactive();
      dispatch(getProperties());
    } catch (error: any) {
      toast.error(error.data.error);
    }
  };

  return (
    <Dialog open={isCreating} onClose={creatingInactive}>
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
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Property Name"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="houseNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="House number"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="street"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Street"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="suburb"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    variant="outlined"
                    label="Suburb"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="zipcode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Zipcode"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Price"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="rooms"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Rooms"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="bathrooms"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Bathrooms"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="floors"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Floors"
                    fullWidth
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="sqm"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    label="Square meters"
                    fullWidth
                    required
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
                      <Checkbox {...field} color="primary" />
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
                defaultValue=""
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

export default CreatePropertyForm;
