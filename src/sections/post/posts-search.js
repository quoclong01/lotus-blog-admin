import axios from "axios";
import PropTypes from "prop-types";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { environment, ENDPOINT } from "src/config";
import { getLS, KEYS } from "src/helpers/localStorage";
import { applyPagination } from "src/utils/apply-pagination";

export const PostsSearch = (props) => {
  const {
    page = 0,
    rowsPerPage = 0,
    isRequestAPI,
    setIsRequestAPI = () => {},
    setPosts = () => {},
  } = props;

  const handleChange = async (e) => {
    const title = e.target.value;
    if (!isRequestAPI) {
      setIsRequestAPI(true);
      await axios
        .get(`${environment.apiBaseUrl}${ENDPOINT.posts.public}?query=${title ? title : ""}`)
        .then((res) => {
          if (res.data.data) {
            const newListPosts = applyPagination(res.data.data, page, rowsPerPage);
            setPosts(newListPosts);
            setIsRequestAPI(false);
          }
        })
        .catch((err) => {
          setIsRequestAPI(false);
        });
    }
  };
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Tìm kiếm bài viết"
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </Card>
  );
};

PostsSearch.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isRequestAPI: PropTypes.bool,
  setIsRequestAPI: PropTypes.func,
  setPosts: PropTypes.func,
};
