import axios from 'axios';
import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UsersTable } from 'src/sections/user/users-table';
import { UsersSearch } from 'src/sections/user/users-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { environment, ENDPOINT } from 'src/config';

const useUserIds = (users) => {
  return useMemo(
    () => {
      return users.map((customer) => customer.id);
    },
    [users]
  );
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isRequestAPI, setIsRequestAPI] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  const getListUsers = async () => {
    if (!isRequestAPI) {
      setIsRequestAPI(true);
      await axios
        .get(`${environment.apiBaseUrl}${ENDPOINT.users.index}`)
        .then((res) => {
          setIsRequestAPI(false);
          setData(res.data.users);
          const newListUsers = applyPagination(res.data.users, page, rowsPerPage);
          setUsers(newListUsers);
        })
        .catch((err) => {
          setIsRequestAPI(false);
          setData([]);
        });
    }
  }

  useEffect(() => {
    getListUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newListUsers = applyPagination(data, page, rowsPerPage);
    setUsers(newListUsers);
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Quản lý người dùng</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Quản lý người dùng</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <UsersSearch
              page={page}
              rowsPerPage={rowsPerPage}
              setUsers={setUsers}
              isRequestAPI={isRequestAPI}
              setIsRequestAPI={setIsRequestAPI}
            />
            {isRequestAPI ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <UsersTable
                count={data.length}
                items={users}
                onDeselectAll={usersSelection.handleDeselectAll}
                onDeselectOne={usersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={usersSelection.handleSelectAll}
                onSelectOne={usersSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={usersSelection.selected}
                setUsers={setUsers}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
