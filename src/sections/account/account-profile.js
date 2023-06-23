import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile = ({ userInfo }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={userInfo.picture}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {userInfo.firstName} {userInfo.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {userInfo.phone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    {/* <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
);
