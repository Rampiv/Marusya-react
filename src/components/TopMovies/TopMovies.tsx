import { useContext } from "react"
import "./TopMovies.scss"
import { MainPageContext } from "../../App"
import { CardsList } from "../Other"

export const TopMovies = () => {
  const { topMovies } = useContext(MainPageContext)[0]

  if (!topMovies?.length) return null

  return (
    <section className="top-movies" aria-labelledby="top-movies-heading">
      <div className="container">
        <div className="content-common">
          <h2 id="top-movies-heading" className="h2-common">
            Топ 10 фильмов
          </h2>
          <CardsList MoviesList={topMovies} />
        </div>
      </div>
    </section>
  )
}
