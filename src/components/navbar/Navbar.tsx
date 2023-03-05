import React, { useContext } from "react";
import Link from "next/link";

import { Box, Button, IconButton, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { PropertyContext } from "@/context/create-property.ctx";

const Navbar = () => {
  const { creatingActive } = useContext(PropertyContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        bgcolor: "white",
        px: 2,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <IconButton>
        <Link href={"/properties/"}>
          <MapsHomeWorkIcon />
        </Link>
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="subtitle2"
          sx={{ mr: 2, color: "text.secondary" }}
          onClick={creatingActive}
        >
          Create a property
        </Typography>
        <Link href={"/login/"}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ textTransform: "none", borderRadius: "2em" }}
          >
            Sign up
          </Button>
        </Link>
        <IconButton>
          <HouseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
