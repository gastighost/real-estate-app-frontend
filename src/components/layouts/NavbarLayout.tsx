import Navbar from "../navbar/Navbar";

const NavbarLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default NavbarLayout;
