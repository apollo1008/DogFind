import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  CircularProgress,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

interface FavoritesBarProps {
  favoritesCount: number;
  onGenerateMatch: () => void;
  onLogout: () => void;
  loading: boolean;
}

export default function FavoritesBar({
  favoritesCount,
  onGenerateMatch,
  onLogout,
  loading
}: FavoritesBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      className="bg-white"
    >
      <Toolbar>
        <Box className="flex items-center">
          <PetsIcon color="primary" className="mr-2" />
          <Typography variant="h6" component="div" className="mr-2">
            Find Dog
          </Typography>
        </Box>

        <Box className="flex-grow" />

        <Box className="flex items-center space-x-2">
          <Badge badgeContent={favoritesCount} color="error" showZero max={99}>
            <Chip
              icon={<FavoriteIcon />}
              label={
                isMobile
                  ? ""
                  : `${favoritesCount} Favorite${
                      favoritesCount !== 1 ? "s" : ""
                    }`
              }
              variant="outlined"
              size="small"
              className="min-w-20"
            />
          </Badge>

          <Button
            variant="contained"
            color="success"
            onClick={onGenerateMatch}
            disabled={favoritesCount === 0 || loading}
            size={isMobile ? "small" : "medium"}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <VolunteerActivismIcon />
              )
            }
            className="whitespace-nowrap"
          >
            {isMobile ? "Match" : "Find My Match"}
          </Button>

          {isMobile ? (
            <IconButton onClick={onLogout} color="inherit" size="small">
              <LogoutIcon />
            </IconButton>
          ) : (
            <Button
              onClick={onLogout}
              color="inherit"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
