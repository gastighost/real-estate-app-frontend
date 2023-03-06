import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Box, Button, IconButton, Typography } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { PropertyContext } from "@/context/create-property.ctx";
import { RootState } from "@/store/store";

const Navbar = () => {
  const { loggedInUser } = useSelector((store: RootState) => store.users);
  const { creatingActive } = useContext(PropertyContext);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");

    router.push("/login/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        bgcolor: "white",
        px: 2,
        py: 3,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
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
          style={{ cursor: "pointer" }}
        >
          Create a property
        </Typography>
        {!loggedInUser && (
          <Link href={"/login/"}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none", borderRadius: "2em" }}
            >
              Login
            </Button>
          </Link>
        )}

        {loggedInUser && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ textTransform: "none", borderRadius: "2em" }}
            onClick={logout}
          >
            Logout
          </Button>
        )}
        <IconButton>
          <Link href={"/"}>
            <HouseIcon />
          </Link>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
