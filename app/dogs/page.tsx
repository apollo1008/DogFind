"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Grid,
  Box,
  Typography,
  Alert,
  Paper,
  Snackbar,
  Button
} from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { Dog, SearchResult } from "@/types";
import DogCard from "@/components/DogCard";
import Loading from "@/components/Loading";
import FilterPanel from "@/components/FilterPanel";
import Pagination from "@/components/Pagination";
import FavoritesBar from "@/components/FavoritesBar";
import MatchModal from "@/components/MatchModal";

import {
  getBreeds,
  searchDogsFromBreeds,
  getDogs,
  matchDog,
  logout
} from "@/lib/api";

export default function DogsPage() {
  const router = useRouter();

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [matchLoading, setMatchLoading] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await getBreeds();
        setBreeds(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    };

    fetchBreeds();
    searchDogs(currentPage);
  }, []);

  const searchDogs = async (page: number) => {
    setLoading(true);
    setError("");

    try {
      const searchResult: SearchResult = await searchDogsFromBreeds({
        breeds: selectedBreeds,
        ageMin: ageMin ? parseInt(ageMin) : undefined,
        ageMax: ageMax ? parseInt(ageMax) : undefined,
        sort: `breed:${sortDirection}`,
        size: 12,
        from: (page - 1) * 12
      });

      setNextCursor(searchResult.next);
      setPrevCursor(searchResult.prev);

      setTotalPages(Math.ceil(searchResult.total / 12));

      if (searchResult.resultIds.length) {
        const dogsData: Dog[] = await getDogs(searchResult.resultIds);
        setDogs(dogsData);
      } else {
        setDogs([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (dogId: string) => {
    setFavoriteIds(prev => {
      const newFavorites = new Set(prev);
      const isFavorite = newFavorites.has(dogId);

      if (isFavorite) {
        newFavorites.delete(dogId);
        setSnackbarMessage("Removed from favorites");
      } else {
        newFavorites.add(dogId);
        setSnackbarMessage("Added to favorites");
      }

      setSnackbarOpen(true);
      return newFavorites;
    });
  };

  const generateMatch = async () => {
    if (favoriteIds.size === 0) {
      setError(
        "Please add at least one dog to your favorites to generate a match"
      );
      return;
    }

    setMatchLoading(true);
    setError("");

    try {
      const data = await matchDog(Array.from(favoriteIds));
      const matchDogData = await getDogs([data.match]);
      setMatchedDog(matchDogData[0]);
      setShowMatch(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setMatchLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    searchDogs(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchDogs(page);
  };

  const handleSortDirectionChange = (direction: "asc" | "desc") => {
    setSortDirection(direction);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const clearFilters = () => {
    setSelectedBreeds([]);
    setAgeMin("");
    setAgeMax("");
    setSortDirection("asc");
    searchDogs(1);
  };

  return (
    <Box className="min-h-screen bg-gray-50 flex flex-col">
      <FavoritesBar
        favoritesCount={favoriteIds.size}
        onGenerateMatch={generateMatch}
        onLogout={handleLogout}
        loading={matchLoading}
      />

      <Container maxWidth="xl" className="py-6 flex-grow">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FilterPanel
              breeds={breeds}
              selectedBreeds={selectedBreeds}
              ageMin={ageMin}
              ageMax={ageMax}
              sortDirection={sortDirection}
              loading={loading}
              onBreedChange={setSelectedBreeds}
              onAgeMinChange={setAgeMin}
              onAgeMaxChange={setAgeMax}
              onSortDirectionChange={handleSortDirectionChange}
              onSearchSubmit={handleSearchSubmit}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper elevation={1} className="p-4 mb-4">
              <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <Typography
                  variant="h6"
                  component="h1"
                  className="mb-2 sm:mb-0"
                >
                  {loading
                    ? "Finding dogs..."
                    : dogs.length > 0
                    ? `Found ${dogs.length} dogs`
                    : "No dogs found"}
                </Typography>

                {totalPages > 1 && !loading && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    hasPreviousPage={!!prevCursor}
                    hasNextPage={!!nextCursor}
                    onPageChange={handlePageChange}
                    disabled={loading}
                  />
                )}
              </Box>
            </Paper>

            {error && (
              <Alert
                severity="error"
                className="mb-4"
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            {loading ? (
              <Box className="py-12 flex justify-center">
                <Loading size="large" message="Fetching dogs..." />
              </Box>
            ) : dogs.length === 0 ? (
              <Paper elevation={1} className="p-8 text-center">
                <SearchOffIcon className="text-gray-400 text-6xl mb-4" />
                <Typography variant="h6" gutterBottom>
                  No dogs found matching your criteria
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="mb-6"
                >
                  Try adjusting your filters or clearing them to see more dogs.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<RestartAltIcon />}
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {dogs.map(dog => (
                  <Grid item xs={12} sm={6} lg={4} key={dog.id}>
                    <DogCard
                      dog={dog}
                      isFavorite={favoriteIds.has(dog.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  </Grid>
                ))}
              </Grid>
            )}

            {!loading && totalPages > 1 && (
              <Box className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hasPreviousPage={!!prevCursor}
                  hasNextPage={!!nextCursor}
                  onPageChange={handlePageChange}
                  disabled={loading}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />

      {matchedDog && (
        <MatchModal
          dog={matchedDog}
          onClose={() => setShowMatch(false)}
          open={showMatch}
        />
      )}
    </Box>
  );
}
