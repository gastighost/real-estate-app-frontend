import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";

const NavbarLayout = ({ children }: any) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <main>{children}</main>
    </Box>
  );
};

export default NavbarLayout;
