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
    type: "ANY",
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
      <FormControl className="flex text-center">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={searchValues.type}
          name="type"
          className="w-48 h-10"
          onChange={onChangeHandler}
        >
          <MenuItem value={"ANY"}>Any</MenuItem>
          <MenuItem value={"HOUSE"}>House</MenuItem>
          <MenuItem value={"APARTMENT"}>Apartment</MenuItem>
          <MenuItem value={"COMMERCIAL"}>Commercial</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="search-bar"
        className="w-48 h-10"
        label="Min price"
        placeholder="Search..."
        type="number"
        name="price"
        onChange={onChangeHandler}
        value={searchValues.price}
        size="small"
      />

      <TextField
        id="search-bar"
        className="w-48 h-10"
        label="Number of rooms"
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
        className="w-48 h-10"
        label="Number of bathrooms"
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
        className="w-48 h-10"
        label="Minimum square meters"
        placeholder="Search..."
        type="number"
        name="sqm"
        onChange={onChangeHandler}
        value={searchValues.sqm}
        size="small"
        sx={{ maxWidth: 170 }}
      />

      <Button
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={onSubmit}
      >
        Search
      </Button>
    </Box>
  );
};

export default PropertySearchBar;
