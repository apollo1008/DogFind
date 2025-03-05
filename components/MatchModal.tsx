import React from "react";
import { Dog } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PetsIcon from "@mui/icons-material/Pets";
import CelebrationIcon from "@mui/icons-material/Celebration";

interface MatchModalProps {
  dog: Dog;
  onClose: () => void;
  open: boolean;
}

export default function MatchModal({ dog, onClose, open }: MatchModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-xl overflow-hidden"
      }}
    >
      <DialogTitle className="bg-blue-50 flex justify-between items-center">
        <Box className="flex items-center">
          <CelebrationIcon className="text-yellow-500 mr-2" />
          <Typography variant="h6">Match!</Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box className="pt-4 pb-6">
          <Box className="text-center mb-6">
            <Chip
              icon={<PetsIcon />}
              label="Perfect Match!"
              color="primary"
              variant="outlined"
              className="mb-2"
            />
            <Typography variant="h5" className="mb-1">
              Meet {dog.name}! 🎉
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Congratulations on finding your new best friend!
            </Typography>
          </Box>

          <Box
            className="rounded-lg overflow-hidden mb-6"
            sx={{
              height: 240,
              backgroundImage: `url(${dog.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <Box className="bg-gray-50 rounded-lg p-4 mb-6">
            <Typography variant="subtitle1" className="mb-2">
              {dog.name}'s Details
            </Typography>

            <List disablePadding>
              <ListItem disablePadding className="mb-1">
                <ListItemIcon className="min-w-0 mr-2">
                  <PetsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Breed"
                  secondary={dog.breed}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "textSecondary"
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>

              <ListItem disablePadding className="mb-1">
                <ListItemIcon className="min-w-0 mr-2">
                  <CakeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Age"
                  secondary={`${dog.age} ${
                    dog.age === 1 ? "year" : "years"
                  } old`}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "textSecondary"
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemIcon className="min-w-0 mr-2">
                  <LocationOnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={dog.zip_code}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "textSecondary"
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>
            </List>
          </Box>

          <Box className="text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
              className="min-w-32"
            >
              Continue Browsing
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
