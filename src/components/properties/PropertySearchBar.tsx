import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { getProperties } from "@/store/properties";
import { AppDispatch } from "@/store/store";

interface SearchValues {
  type: string;
  price: string;
  rooms: string;
  bathrooms: string;
  sqm: string;
}

const PropertySearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchValues, setSearchValues] = useState<SearchValues>({
    type: "",
    price: "",
    rooms: "",
    bathrooms: "",
    sqm: "",
  });

  const onChangeHandler = useCallback(
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      setSearchValues((prevState) => {
        const { name, value } = event.target;

        return { ...prevState, [name]: value };
      });
    },
    []
  );

  const onSubmit = useCallback(() => {
    dispatch(getProperties(searchValues));
  }, [searchValues, dispatch]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      p={2}
      sx={{ backgroundColor: "white" }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Property</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchValues.type}
          label="Property Type"
          name="type"
          onChange={onChangeHandler}
          sx={{ width: 120 }}
        >
          <MenuItem value={""}>Any</MenuItem>
          <MenuItem value={"HOUSE"}>House</MenuItem>
          <MenuItem value={"APARTMENT"}>Apartment</MenuItem>
          <MenuItem value={"COMMERCIAL"}>Commercial</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="search-bar"
        className="text"
        label="Min price"
        variant="outlined"
        placeholder="Search..."
        type="number"
        name="price"
        onChange={onChangeHandler}
        value={searchValues.price}
        size="small"
        sx={{ maxWidth: 170 }}
      />

      <TextField
        id="search-bar"
        className="text"
        label="Number of rooms"
        variant="outlined"
        placeholder="Search..."
        type="number"
        name="rooms"
        onChange={onChangeHandler}
        value={searchValues.rooms}
        size="small"
        sx={{ maxWidth: 170 }}
      />

      <TextField
        id="search-bar"
        className="text"
        label="Number of bathrooms"
        variant="outlined"
        placeholder="Search..."
        type="number"
        name="bathrooms"
        onChange={onChangeHandler}
        value={searchValues.bathrooms}
        size="small"
        sx={{ maxWidth: 170 }}
      />

      <TextField
        id="search-bar"
        className="text"
        label="Minimum square meters"
        variant="outlined"
        placeholder="Search..."
        type="number"
        name="sqm"
        onChange={onChangeHandler}
        value={searchValues.sqm}
        size="small"
        sx={{ maxWidth: 170 }}
      />

      <Button onClick={onSubmit}>Search</Button>
    </Box>
  );
};

export default PropertySearchBar;
