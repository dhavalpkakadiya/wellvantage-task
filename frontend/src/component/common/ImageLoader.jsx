import React, { useState } from "react";
import { CircularProgress } from "@mui/material";

const ImageWithLoader = ({ src, alt, ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        minHeight: 100,
        width: "100%",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <CircularProgress sx={{ color: "#35a642" }} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        style={{
          display: loading ? "none" : "block",
          width: "100%",
          height: "auto",
        }}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoader;
