import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

export default function Loading({ size = "medium", message }: LoadingProps) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60
  };

  return (
    <Box className="flex flex-col items-center justify-center p-4">
      <CircularProgress size={sizeMap[size]} thickness={4} />
      {message && (
        <Typography variant="body2" color="textSecondary" className="mt-2">
          {message}
        </Typography>
      )}
    </Box>
  );
}
