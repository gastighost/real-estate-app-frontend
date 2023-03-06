import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box>
      <Box bgcolor="primary.main" color="primary.contrastText" py={10}>
        <Box maxWidth={800} mx="auto" textAlign="center">
          <Typography variant="h2" gutterBottom>
            Buy your dream home now
          </Typography>
          <Typography variant="h5" gutterBottom>
            Find the best home for you today
          </Typography>
          <Box mt={4}>
            <Link href={"/properties/"}>
              <Button variant="contained" color="secondary" size="large">
                Get started
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Box my={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                image="https://picsum.photos/id/1018/500/300"
                alt="Image"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Entire homes
                </Typography>
                <Typography variant="body1">
                  Comfortable private places, with room for friends or family.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardMedia
                component="img"
                image="https://picsum.photos/id/1024/500/300"
                alt="Image"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Unique stays
                </Typography>
                <Typography variant="body1">
                  Spaces that are more than just a place to sleep.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        py={5}
        textAlign="center"
      >
        <Typography variant="h5" gutterBottom>
          Join millions of hosts on Airbnb
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="secondary" size="large">
            Become a host
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
