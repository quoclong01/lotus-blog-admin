import axios from "axios";
import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CommentsTable } from "src/sections/comments/comments-table";
import { CommentsSearch } from "src/sections/comments/comments-search";
import { applyPagination } from "src/utils/apply-pagination";
import { environment, ENDPOINT } from "src/config";

const useCommentIds = (comments) => {
  return useMemo(() => {
    return comments.map((customer) => customer.id);
  }, [comments]);
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [isRequestAPI, setIsRequestAPI] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [comments, setComments] = useState([]);
  const commentsIds = useCommentIds(comments);
  const commentsSelection = useSelection(commentsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);
  
  const getListComments = async () => {
    if (!isRequestAPI) {
      setIsRequestAPI(true);
      await axios
        .get(`${environment.apiBaseUrl}${ENDPOINT.posts.comments}`)
        .then((res) => {
          setIsRequestAPI(false);
          setData(res.data.data);
          const newListComments = applyPagination(res.data.data, page, rowsPerPage);
          setComments(newListComments);
        })
        .catch((err) => {
          setIsRequestAPI(false);
          setData([]);
        });
    }
  };

  useEffect(() => {
    getListComments();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const newListComments = applyPagination(data, page, rowsPerPage);
    setComments(newListComments);
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <>
      <Head>
        <title>Quản lý bình luận</title>
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
                <Typography variant="h4">Quản lý bình luận</Typography>
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
            <CommentsSearch
              page={page}
              rowsPerPage={rowsPerPage}
              setComments={setComments}
              isRequestAPI={isRequestAPI}
              setIsRequestAPI={setIsRequestAPI}
            />
            {isRequestAPI ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <CommentsTable
                count={data.length}
                items={comments}
                onDeselectAll={commentsSelection.handleDeselectAll}
                onDeselectOne={commentsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={commentsSelection.handleSelectAll}
                onSelectOne={commentsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={commentsSelection.selected}
                setComments={setComments}
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
