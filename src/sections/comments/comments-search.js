import axios from "axios";
import PropTypes from "prop-types";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { environment, ENDPOINT } from "src/config";
import { applyPagination } from "src/utils/apply-pagination";

export const CommentsSearch = (props) => {
  const {
    page = 0,
    rowsPerPage = 0,
    isRequestAPI,
    setIsRequestAPI = () => {},
    setComments = () => {},
  } = props;

  const handleChange = async (e) => {
    const comment = e.target.value;

    if (!isRequestAPI) {
      setIsRequestAPI(true);
      await axios
        .get(`${environment.apiBaseUrl}${ENDPOINT.posts.comments}?comment=${comment ? comment : ""}`)
        .then((res) => {
          if (res.data.data) {
            const newListComments = applyPagination(res.data.data, page, rowsPerPage);
            setComments(newListComments);
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
        placeholder="Tìm kiếm bình luận"
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

CommentsSearch.propTypes = {
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isRequestAPI: PropTypes.bool,
  setIsRequestAPI: PropTypes.func,
  setComments: PropTypes.func,
};
