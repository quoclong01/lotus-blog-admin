import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import ChatBubbleLeftRightIcon from "@heroicons/react/24/solid/ChatBubbleLeftRightIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

export const OverviewTasksProgress = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="overline"
            >
              Tổng số lượt bình luận
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ChatBubbleLeftRightIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTasksProgress.propTypes = {
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};
