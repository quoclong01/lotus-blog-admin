import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestUsers } from 'src/sections/overview/overview-latest-users';
import { OverviewLatestPosts } from "src/sections/overview/overview-latest-posts";
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { environment, ENDPOINT } from 'src/config';
import { getLS, KEYS } from 'src/helpers/localStorage';

const now = new Date();

const Page = () => {
  const [isRequestAPI, setIsRequestAPI] = useState(false);
  const [infoApp, setInfoApp] = useState();
  
  const getInfoApp = async () => {
    if (!isRequestAPI) {
      setIsRequestAPI(true);
       const data = getLS(KEYS.USER_INFO, {});
       await axios
         .get(`${environment.apiBaseUrl}${ENDPOINT.posts.info}`, {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${data.accessToken}`,
           },
         })
         .then((res) => {
           if (res) {
             setInfoApp(res.data);
             setIsRequestAPI(false);
           }
         })
         .catch((err) => {
           setInfoApp({});
           setIsRequestAPI(false);
         });
    }
  };

  useEffect(() => {
    getInfoApp();
    // eslint-disable-next-line
  }, []);

  return (
  <>
    <Head>
      <title>
        Tổng quan
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value={infoApp?.totalPosts ? infoApp.totalPosts : '0'}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={infoApp?.totalUsers ? infoApp.totalUsers.toString() : '0'}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={infoApp?.totalComments ? infoApp.totalComments.toString() : '0'}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value={infoApp?.totalLikes ? infoApp.totalLikes.toString() : '0'}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestPosts
              posts={infoApp?.posts ? infoApp.posts : []}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestUsers
              users={infoApp?.users ? infoApp.users : []}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
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
