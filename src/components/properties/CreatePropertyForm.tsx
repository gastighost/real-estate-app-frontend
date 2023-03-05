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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { PropertyContext } from "@/context/create-property.ctx";

const StyledFormControlLabel = styled(FormControlLabel)({
  marginTop: 20,
});

const CreatePropertyForm = () => {
  const { control, handleSubmit } = useForm();

  const { isCreating, creatingInactive } = useContext(PropertyContext);

  const onSubmit = (data: any) => {
    console.log(data);
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
          onSubmit={() => handleSubmit(onSubmit)}
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
