import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { getLS, KEYS } from 'src/helpers/localStorage';

const states = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    const data = getLS(KEYS.USER_INFO, {});
    if (data.userInfo) {
      setValues(data.userInfo);
    }
  }, []);

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="Thông tin không thể chỉnh sửa"
          title="Thông tin"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.gender}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};
