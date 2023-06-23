import axios from 'axios';
import { useState } from "react";
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Scrollbar } from 'src/components/scrollbar';
import { environment, ENDPOINT } from 'src/config';
import { getLS, KEYS } from "src/helpers/localStorage";
import { applyPagination } from 'src/utils/apply-pagination';

export const PostsTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setPosts = () => {}
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [open, setOpen] = useState(false);

  const handleDeletePost = async (id) => {
    if (id) {
      const data = getLS(KEYS.USER_INFO, {});
      await axios
        .delete(`${environment.apiBaseUrl}${ENDPOINT.posts.index}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            setOpen(true);
            const data = items.filter(item => item.id !== id);
            const newListPosts = applyPagination(data, page, rowsPerPage);
            setPosts(newListPosts);
          }
        })
        .catch((err) => {
            setOpen(true);
        });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      {alert ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          onClose={handleClose}
          autoHideDuration={2000}
          key="top right"
        >
          <Alert
            severity="info"
            variant="filled"
          >
            Action Delete Post!
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((post) => {
                const isSelected = selected.includes(post.id);

                return (
                  <TableRow hover key={post.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(post.id);
                          } else {
                            onDeselectOne?.(post.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{post.id}</TableCell>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.content}</TableCell>
                    <TableCell>{post.description}</TableCell>
                    <TableCell>{post.status}</TableCell>
                    <TableCell>{post.user.displayName}</TableCell>
                    <TableCell>{post.likes}</TableCell>
                    <TableCell>{post.comments}</TableCell>
                    <TableCell>{post.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDeletePost(post.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

PostsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
