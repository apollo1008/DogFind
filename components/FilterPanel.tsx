import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Autocomplete,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";

interface FilterPanelProps {
  breeds: string[];
  selectedBreeds: string[];
  ageMin: string;
  ageMax: string;
  sortDirection: "asc" | "desc";
  loading: boolean;
  onBreedChange: (breeds: string[]) => void;
  onAgeMinChange: (value: string) => void;
  onAgeMaxChange: (value: string) => void;
  onSortDirectionChange: (direction: "asc" | "desc") => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export default function FilterPanel({
  breeds,
  selectedBreeds,
  ageMin,
  ageMax,
  sortDirection,
  loading,
  onBreedChange,
  onAgeMinChange,
  onAgeMaxChange,
  onSortDirectionChange,
  onSearchSubmit
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Paper elevation={2} className="overflow-hidden">
      <Box className="md:hidden">
        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box className="flex items-center">
              <FilterListIcon className="mr-2" />
              <Typography variant="subtitle1">Filter Dogs</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FilterForm
              breeds={breeds}
              selectedBreeds={selectedBreeds}
              ageMin={ageMin}
              ageMax={ageMax}
              sortDirection={sortDirection}
              loading={loading}
              onBreedChange={onBreedChange}
              onAgeMinChange={onAgeMinChange}
              onAgeMaxChange={onAgeMaxChange}
              onSortDirectionChange={onSortDirectionChange}
              onSearchSubmit={onSearchSubmit}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box className="hidden md:block p-6">
        <Box className="flex items-center mb-4">
          <FilterListIcon className="mr-2" />
          <Typography variant="h6">Filter Dogs</Typography>
        </Box>

        <FilterForm
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          ageMin={ageMin}
          ageMax={ageMax}
          sortDirection={sortDirection}
          loading={loading}
          onBreedChange={onBreedChange}
          onAgeMinChange={onAgeMinChange}
          onAgeMaxChange={onAgeMaxChange}
          onSortDirectionChange={onSortDirectionChange}
          onSearchSubmit={onSearchSubmit}
        />
      </Box>
    </Paper>
  );
}

function FilterForm({
  breeds,
  selectedBreeds,
  ageMin,
  ageMax,
  sortDirection,
  loading,
  onBreedChange,
  onAgeMinChange,
  onAgeMaxChange,
  onSortDirectionChange,
  onSearchSubmit
}: FilterPanelProps) {
  return (
    <form onSubmit={onSearchSubmit} className="space-y-6">
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Breeds
        </Typography>
        <Autocomplete
          multiple
          id="breeds-select"
          options={breeds}
          value={selectedBreeds}
          onChange={(_, newValue) => onBreedChange(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                key={option}
                size="small"
              />
            ))
          }
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Select breeds"
              variant="outlined"
              size="small"
              fullWidth
            />
          )}
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Age Range
        </Typography>
        <Box className="flex space-x-2 items-center">
          <TextField
            type="number"
            value={ageMin}
            onChange={e => onAgeMinChange(e.target.value)}
            inputProps={{ min: 0 }}
            placeholder="Min"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Typography variant="body2" className="px-1">
            to
          </Typography>
          <TextField
            type="number"
            value={ageMax}
            onChange={e => onAgeMaxChange(e.target.value)}
            inputProps={{ min: ageMin || 0 }}
            placeholder="Max"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
      </Box>

      <Box>
        <Typography
          variant="subtitle2"
          gutterBottom
          className="flex items-center"
        >
          <SortIcon fontSize="small" className="mr-1" />
          Sort By Breed
        </Typography>
        <ToggleButtonGroup
          value={sortDirection}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              onSortDirectionChange(newValue);
            }
          }}
          fullWidth
          size="small"
        >
          <ToggleButton value="asc">A-Z</ToggleButton>
          <ToggleButton value="desc">Z-A</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
      >
        {loading ? "Searching..." : "Apply Filters"}
      </Button>
    </form>
  );
}
