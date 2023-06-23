import { formatDate } from 'src/helpers/formatDate';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import ClipboardDocumentCheckIcon from "@heroicons/react/24/solid/ClipboardDocumentCheckIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Avatar,
} from "@mui/material";

export const OverviewLatestPosts = (props) => {
  const { posts = [], sx } = props;
  
  return (
    <Card sx={sx}>
      <CardHeader title="Bài viết gần đây" />
      <List>
        {posts.slice(-5).map((post, index) => {
          const hasDivider = index < posts.length - 1;
          const ago = formatDate(post.updatedAt);
          return (
            <ListItem
              divider={hasDivider}
              key={post.id}
            >
              <ListItemAvatar>
                {
                  post.cover
                    ? (
                      <Box
                        component="img"
                        src={post.cover}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Avatar>
                        <ClipboardDocumentCheckIcon />
                      </Avatar>
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={post.title}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago}`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          );
        })}
      </List>
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
          href='/posts'
        >
          Xem thêm
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestPosts.propTypes = {
  posts: PropTypes.array,
  sx: PropTypes.object
};
