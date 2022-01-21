/** @format */

import { Typography } from "@mui/material";
import { NoresultProps } from "../redux/types";

const NoResults = (
  props: NoresultProps
) => {
  const { search_query, result_count } =
    props;
  let message =
    "No records are in list please try adding one";

  if (
    search_query !== "" &&
    result_count === 0
  ) {
    message =
      "No results found for you query `" +
      search_query +
      "`,try with any other text";
  }
  return (
    <div className="No-result-container">
      <div className="No-data-image-container">
        <img
          className="No-data-image"
          src="/images/no-data.svg"
          alt="no data"
        />
      </div>
      <div>
        <Typography
          variant="h5"
          textAlign="center"
        >
          {message}
        </Typography>
      </div>
    </div>
  );
};
export default NoResults;
