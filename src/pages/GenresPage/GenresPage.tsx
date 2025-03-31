import { useContext } from "react"
import { GenresContext } from "../../App"
import { AddGenreImage } from "../../components"
import "./GenresPage.scss"
import { Link } from "react-router"

export const GenresPage = () => {
  const { genres } = useContext(GenresContext)
  if (genres) {
    return (
      <section className="genres">
        <div className="container">
          <div className="content-common genres__content">
            <h2 className="genres__h2">Жанры фильмов</h2>
            <ul className="genres__list" aria-label="Список жанров">
              {genres.map((item: string) => {
                return (
                  <li className="genres__list-item" key={item}>
                    <Link to={`/genres/${item}`} className="genres__link">
                      {AddGenreImage(item)}
                      <span className="genres__link-title">{item}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    )
  }
}
