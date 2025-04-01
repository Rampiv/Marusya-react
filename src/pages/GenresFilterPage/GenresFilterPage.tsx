import { useCallback, useContext, useEffect, useState } from "react"
import "./GenresFilterPage.scss"
import { AllMoviesContext } from "../../App"
import { Link, useParams } from "react-router"
import { CardsList } from "../../components/Other"
import type { Movie } from "@models/Movie"
import { ArrowIcon } from "@assets/icons"

export const GenresFilterPage = () => {
  const [movies] = useContext(AllMoviesContext)
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>()

  const { genre } = useParams()

  const filterMoviesByGenre = useCallback((movies: Movie[], genre: string) => {
    return movies.filter(movie => {
      return movie.genres.some(movieGenre => movieGenre.toLowerCase() === genre)
    })
  }, [])

  useEffect(() => {
    if (!genre) return
    setFilteredMovies(filterMoviesByGenre(movies.movies, genre))
  }, [genre, filterMoviesByGenre, movies.movies])

  return (
    <section className="genres">
      <div className="container">
        <div className="content-common genres__content">
          <Link to={"/genres"} className="genres__h2 genresfilter-title">
            <ArrowIcon />
            {genre}
          </Link>
          {filteredMovies ? (
            filteredMovies.length > 0 ? (
              <CardsList
                MoviesList={filteredMovies}
                ProfileProps={{ ClassNameSpan: "hide" }}
              />
            ) : (
              <span className="genresfilter-error">
                Фильмов данного жанра нет в базе
              </span>
            )
          ) : (
            <span className="genresfilter-error">
              Ошибка в получении фильмов
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
