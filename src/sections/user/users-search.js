import axios from 'axios';
import PropTypes from "prop-types";
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { environment, ENDPOINT } from "src/config";
import { getLS, KEYS } from "src/helpers/localStorage";
import { applyPagination } from 'src/utils/apply-pagination';

export const UsersSearch = (props) => {
  const {
    page = 0,
    rowsPerPage = 0,
    isRequestAPI,
    setIsRequestAPI = () => {},
    setUsers = () => {},
  } = props;

  const handleChange = async (e) => {
    const email = e.target.value;
    if (!isRequestAPI) {
      const data = getLS(KEYS.USER_INFO, {});
      setIsRequestAPI(true);
      await axios
        .get(`${environment.apiBaseUrl}${ENDPOINT.users.search}?email=${email ? email : ''}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.data) {
            const newListUsers = applyPagination(res.data.data, page, rowsPerPage);
            console.log(newListUsers);
            setUsers(newListUsers);
            setIsRequestAPI(false);
          }
        })
        .catch((err) => {
          setIsRequestAPI(false);
        });
    }
  }
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Tìm kiếm người dùng"
        onChange={handleChange}
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  )
}

UsersSearch.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isRequestAPI: PropTypes.bool,
  setIsRequestAPI: PropTypes.func,
  setUsers: PropTypes.func,
};

