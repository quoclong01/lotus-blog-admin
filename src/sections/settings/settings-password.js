import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import { getLS, KEYS } from "src/helpers/localStorage";
import { environment, ENDPOINT } from "src/config";
import axios from 'axios';

export const SettingsPassword = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.newPassword === values.confirmPassword) {
      const userInfo = getLS(KEYS.USER_INFO, '');
      const data = {
        ...values
      }
      delete data.confirmPassword;
      await axios.put(`${environment.apiBaseUrl}${ENDPOINT.users.changePassword}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      })
        .then(res => {
          setOpen(true);
        })
        .catch(err => {
          setOpen(true);
        })
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            Action Change Password!
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Card>
        <CardHeader
          subheader="Cập nhật mẩu khẩu"
          title="Mật khẩu"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Mật khẩu cũ"
              name="oldPassword"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Mật khẩu mới"
              name="newPassword"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Nhập lại mật khẩu mới"
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            type="submit"
          >
            Lưu
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
