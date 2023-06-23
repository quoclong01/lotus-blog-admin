import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from 'src/sections/account/account-profile';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { getLS, KEYS } from 'src/helpers/localStorage';

const Page = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const data = getLS(KEYS.USER_INFO, {});
    if (data.userInfo) {
      setUserInfo(data.userInfo);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Tài khoản của tôi
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Tài khoản của tôi
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile userInfo={userInfo} />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
