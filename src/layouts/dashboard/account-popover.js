import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { getLS, KEYS } from 'src/helpers/localStorage';
import { environment, ENDPOINT } from 'src/config';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  const handleSignOut = useCallback(
    async () => {
      onClose?.();
      const userInfo = getLS(KEYS.USER_INFO, {});
      await axios
        .post(`${environment.apiBaseUrl}${ENDPOINT.users.logout}`,{} , {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        })
        .then((res) => {
          if (res) {
            localStorage.removeItem(KEYS.USER_INFO);
            router.push("/auth/login");
          }
        })
        .catch((err) => {
          console.log(err);
        }); 
    },
    [onClose, router]
  );

  useEffect(() => {
    const data = getLS(KEYS.USER_INFO, {});
    if (data.accessToken) {
      setUserInfo(data.userInfo);
    }
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Tài khoản
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          { userInfo?.displayName }
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
