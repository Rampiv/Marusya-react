import { getGenres } from "./getGenres"
import { getRandomMovie } from "./getRandomMovie"
import { getTopMovies } from "./getTopMovies"
import { getAllMovies } from "./getAllMovies"
import { getIdMovie } from "./getIdMovie"
import { authUser } from "./authUser"
import { registerUser } from "./registerUser"
import { logoutUser } from "./logoutUser"
import { getProfile } from "./getProfile"
import { deleteFavorite } from "./deleteFavorite"
import { addFavorite } from "./addFavorite"

const Api = {
  getRandomMovie,
  getTopMovies,
  getGenres,
  getAllMovies,
  getIdMovie,
  authUser,
  registerUser,
  logoutUser,
  getProfile,
  deleteFavorite,
  addFavorite,
}

export default Api
