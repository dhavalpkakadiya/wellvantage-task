import { CircularProgress } from "@mui/material";

const Spinner = ({ size = 40 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      padding: 8,
    }}
  >
    <CircularProgress sx={{ color: "#b7d5c0" }} size={size} />
  </div>
);

export default Spinner;