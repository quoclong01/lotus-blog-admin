import axios from "axios";
import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PostsTable } from "src/sections/post/posts-table";
import { PostsSearch } from "src/sections/post/posts-search";
import { applyPagination } from "src/utils/apply-pagination";
import { environment, ENDPOINT } from "src/config";

const useUserIds = (users) => {
  return useMemo(() => {
    return users.map((customer) => customer.id);
  }, [users]);
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isRequestAPI, setIsRequestAPI] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const postsIds = useUserIds(posts);
  const postsSelection = useSelection(postsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  const getListPosts = async () => {
    if (!isRequestAPI) {
      setIsRequestAPI(true);
      await axios
        .get(`${environment.apiBaseUrl}${ENDPOINT.posts.public}`)
        .then((res) => {
          setIsRequestAPI(false);
          setData(res.data.data);
          const newListUsers = applyPagination(res.data.data, page, rowsPerPage);
          setPosts(newListUsers);
        })
        .catch((err) => {
          setIsRequestAPI(false);
          setData([]);
        });
    }
  };

  useEffect(() => {
    getListPosts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newListPosts = applyPagination(data, page, rowsPerPage);
    setPosts(newListPosts);
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Quản lý bài viết</title>
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
                <Typography variant="h4">Quản lý bài viết</Typography>
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
            <PostsSearch
              page={page}
              rowsPerPage={rowsPerPage}
              setPosts={setPosts}
              isRequestAPI={isRequestAPI}
              setIsRequestAPI={setIsRequestAPI}
            />
            {isRequestAPI ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <PostsTable
                count={data.length}
                items={posts}
                onDeselectAll={postsSelection.handleDeselectAll}
                onDeselectOne={postsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={postsSelection.handleSelectAll}
                onSelectOne={postsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={postsSelection.selected}
                setPosts={setPosts}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
