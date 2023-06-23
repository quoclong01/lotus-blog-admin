import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Stack,
} from "@mui/material";
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  active: 'success',
  noActive: 'error'
};

export const OverviewLatestUsers = (props) => {
  const { users = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Người dùng hoạt động gần đây" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell sortDirection="desc">
                  Phone
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(-5).map((user) => {
                return (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                       <Avatar src={user.picture}></Avatar>
                        <Typography variant="subtitle2">
                          {user.firstName} {user.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.phone}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[user.isActive ? 'active': 'noActive']}>
                        {user.isActive ? 'active': 'noActive'}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          href='/users'
        >
          Xem thêm
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestUsers.prototype = {
  users: PropTypes.array,
  sx: PropTypes.object,
};
