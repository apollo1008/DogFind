import React from "react";
import {
  Pagination as MuiPagination,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  disabled: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  disabled
}: PaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Box className="flex items-center justify-center space-x-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPreviousPage || disabled}
          size="small"
          startIcon={<NavigateBeforeIcon />}
          variant="outlined"
        >
          Prev
        </Button>

        <Typography variant="body2" className="px-2">
          {currentPage} / {totalPages}
        </Typography>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || disabled}
          size="small"
          endIcon={<NavigateNextIcon />}
          variant="outlined"
        >
          Next
        </Button>
      </Box>
    );
  }

  return (
    <Box className="flex justify-center">
      <MuiPagination
        count={totalPages}
        page={currentPage}
        disabled={disabled}
        onChange={(_: any, page: number) => {
          onPageChange(page);
        }}
        variant="outlined"
        shape="rounded"
        size="medium"
        siblingCount={1}
      />
    </Box>
  );
}
