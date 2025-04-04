import { useEffect, useState } from "react"
import "./GenresFilterPage.scss"

import { Link, useParams } from "react-router"
import { CardsList } from "../../components/Other"
import type { Movie } from "@models/Movie"
import { ArrowIcon } from "@assets/icons"
import Api from "@api/api"

export const GenresFilterPage = () => {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>()

  const { genre } = useParams()

  useEffect(() => {
    async function getData() {
      if (!genre) return
      const response = await Api.getMovies({ query: "genre", value: genre })
      setFilteredMovies(response)
    }
    getData()
  }, [genre])

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
