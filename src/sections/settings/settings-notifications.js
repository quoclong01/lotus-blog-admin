import { useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const SettingsNotifications = () => {
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Quản lý thông báo"
          title="Thông báo"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              xs={12}
              sm={6}
              md={4}
            >
              <Stack spacing={1}>
                <Typography variant="h6">
                  Thông tin
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Text Messages"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Phone calls"
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Stack spacing={1}>
                <Typography variant="h6">
                  Tin nhắn
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Push Notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Phone calls"
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Lưu
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
