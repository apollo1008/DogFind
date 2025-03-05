import React from "react";
import { Dog } from "@/types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Box
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  onToggleFavorite: (dogId: string) => void;
}

export default function DogCard({
  dog,
  isFavorite,
  onToggleFavorite
}: DogCardProps) {
  return (
    <Card className="relative h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <IconButton
        className="absolute top-2 right-2 z-10 bg-white shadow-md"
        onClick={() => onToggleFavorite(dog.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        size="small"
      >
        {isFavorite ? (
          <FavoriteIcon className="text-red-500" />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={dog.img}
        alt={`Photo of ${dog.name}`}
        className="h-52 object-cover"
      />

      <CardContent className="flex-grow flex flex-col">
        <Box className="flex justify-between items-start mb-2">
          <Typography variant="h6" component="h3" gutterBottom>
            {dog.name}
          </Typography>
          <Chip
            label={`${dog.age} ${dog.age === 1 ? "year" : "years"}`}
            size="small"
            color="primary"
            className="bg-blue-100 text-blue-800"
          />
        </Box>

        <Typography
          variant="body2"
          color="textSecondary"
          className="mb-2 flex-grow"
        >
          {dog.breed}
        </Typography>

        <Box className="flex items-center text-gray-500 mt-auto">
          <LocationOnIcon fontSize="small" className="mr-1" />
          <Typography variant="body2" component="span">
            {dog.zip_code}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
