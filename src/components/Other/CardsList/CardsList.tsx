import { Link } from "react-router"
import type { Movie } from "../../../models"
import "./CardsList.scss"
import type { FC } from "react"
import React, { useState } from "react"
import { Poster } from "../Poster"
import { CrossIcon } from "@assets/icons"

const PosterMemo = React.memo(Poster)
const CrossIconMemo = React.memo(CrossIcon)

interface Props {
  MoviesList: Movie[]
  ProfileProps?: {
    ClassNameList?: string
    ClassNameItem?: string
    ClassNameSpan?: string
    isDeleteBtn?: boolean
    onDelete?: (id: number) => void
  }
}

export const CardsList: FC<Props> = ({ MoviesList, ProfileProps }) => {
  const [isVisible, setIsVisible] = useState(false)
  useState(() => {
    if (ProfileProps) {
      ProfileProps.isDeleteBtn && setIsVisible(true)
    }
  })
  if (!MoviesList?.length) return null

  return (
    <ul className={`cards__list ${ProfileProps && ProfileProps.ClassNameList}`}>
      {MoviesList.map((movie: Movie, index: number) => (
        <li
          key={`${movie.id}-${index}`}
          className={`cards__list-item ${ProfileProps && ProfileProps.ClassNameItem}`}
        >
          <span
            className={`cards__list-num ${ProfileProps && ProfileProps.ClassNameSpan}`}
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <button
            className={`profile__item-delete ${!isVisible ? "hide" : ""}`}
            aria-hidden="true"
            onClick={() => {
              if (ProfileProps) {
                if (ProfileProps.onDelete) {
                  ProfileProps.onDelete(movie.id)
                }
              }
            }}
          >
            <CrossIconMemo />
          </button>
          <Link
            to={`/movie/${movie.id}`}
            className="cards__list-link"
            aria-label={`Фильм ${movie.title}, место ${index + 1}`}
          >
            <PosterMemo {...movie} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
