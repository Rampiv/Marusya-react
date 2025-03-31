import type { FC, ReactNode } from "react"

import "./Hero.scss"
import { InfoTop, Loader } from "../Other"
import type { Movie } from "../../models"
import { NoImageIcon } from "@assets/icons"

interface IHero {
  btns: ReactNode[]
  movie: Movie | null
}

export const Hero: FC<IHero> = ({ btns, movie }) => {
  if (!movie) {
    return <Loader />;
  }

    return (
      <section className="hero" aria-labelledby="hero-title">
        <h1 className="hide">Маруся - онлайн платформа по поиску фильмов</h1>
        <div className="container">
          <div className="hero__content content-common">
            <div className="hero__description">
              <InfoTop movie={movie} size={"big"} />
              <h2 className="hero__title">{movie.title}</h2>
              <p className="hero__text">{movie.plot}</p>
              <ul className="hero__list">
                {btns.map((button, index) => (
                  <li className="hero__list-item" key={`hero-btn-${index}`}>
                    {button}
                  </li>
                ))}
              </ul>
            </div>
            {movie.backdropUrl ? (
              <img
                src={movie.backdropUrl}
                alt="Заглавная картинка фильма"
                className="hero__image"
                loading="eager"
              />
            ) : (
              NoImageIcon()
            )}
          </div>
        </div>
      </section>
    )
}
