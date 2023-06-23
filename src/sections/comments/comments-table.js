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

export const CommentsTable = (props) => {
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
    setComments = () => {}
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [open, setOpen] = useState(false);

  const handleDeleteComment = async (id) => {
    if (id) {
      const data = getLS(KEYS.USER_INFO, {});
      await axios
        .delete(`${environment.apiBaseUrl}${ENDPOINT.posts.comments}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            setOpen(true);
            const data = items.filter((item) => item.id !== id);
            const newListComments = applyPagination(data, page, rowsPerPage);
            setComments(newListComments);
          }
        })
        .catch((err) => {
          setOpen(true);
        });
    }
  };

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
          <Alert severity="info" variant="filled">
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
                <TableCell>User Id</TableCell>
                <TableCell>Post Id</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((comment) => {
                const isSelected = selected.includes(comment.id);

                return (
                  <TableRow hover key={comment.id} selected={isSelected}>
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
                    <TableCell>{comment.id}</TableCell>
                    <TableCell>{comment.userId}</TableCell>
                    <TableCell>{comment.postId}</TableCell>
                    <TableCell>{comment.comment}</TableCell>
                    <TableCell>{comment.createdAt}</TableCell>
                    <TableCell>{comment.updatedAt}</TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDeleteComment(comment.id);
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

CommentsTable.propTypes = {
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
