import axios from 'axios';
import { useState } from "react";
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Scrollbar } from 'src/components/scrollbar';
import { environment, ENDPOINT } from 'src/config';
import { getLS, KEYS } from "src/helpers/localStorage";
import { applyPagination } from 'src/utils/apply-pagination';

export const UsersTable = (props) => {
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
    setUsers = () => {}
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [open, setOpen] = useState(false);

  const handleDeleteUser = async (id) => {
    if (id) {
      const data = getLS(KEYS.USER_INFO, {});
      await axios
        .delete(`${environment.apiBaseUrl}${ENDPOINT.users.index}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            setOpen(true);
            const data = items.filter(item => item.id !== id);
            const newListUsers = applyPagination(data, page, rowsPerPage);
            setUsers(newListUsers);
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
          <Alert severity="info" variant="filled">
            Action Delete User!
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>Followings</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                const isSelected = selected.includes(user.id);

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user.id);
                          } else {
                            onDeselectOne?.(user.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={user.picture}></Avatar>
                        <Typography variant="subtitle2">
                          {user.firstName} {user.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.followers}</TableCell>
                    <TableCell>{user.followings}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDeleteUser(user.id);
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

UsersTable.propTypes = {
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
