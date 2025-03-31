import type { FC } from "react"
import { Link } from "react-router"
import type { Movie } from "../../../models"
import { InfoTop } from "../InfoTop"
import "./SearchContent.scss"
import React from "react"

interface SearchContentProps {
  searchResult: Movie[]
  isOpenWrapper: boolean
  onClick: () => void
}
const InfoTopMemo = React.memo(InfoTop)

export const SearchContent: FC<SearchContentProps> = ({
  searchResult,
  isOpenWrapper,
  onClick,
}) => {
  const hasResults = searchResult.length > 0

  const ResultsList = () => {
    if (!hasResults) {
      return (
        <li className="search-wrapper__item">
          <p className="search-wrapper__error">Фильмы не найдены</p>
        </li>
      )
    }

    return searchResult.map(item => (
      <li
        key={`${item.id}-${item.title}`}
        className="search-wrapper__list-item"
      >
        <Link
          to={`/movie/${item.id}`}
          className="search-wrapper__link"
          onClick={onClick}
          aria-label={`Перейти к фильму ${item.title}`}
        >
          <img
            src={item.posterUrl}
            alt={`Постер фильма "${item.title}"`}
            className="search-wrapper__poster"
            loading="lazy"
          />
          <InfoTopMemo movie={item} size="small" />
          <h2 className="search-wrapper__h2">{item.title}</h2>
        </Link>
      </li>
    ))
  }

  return (
    <div
      className={`search-wrapper ${!isOpenWrapper ? "hide" : ""}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <ul className="search-wrapper__list">
        <ResultsList />
      </ul>
    </div>
  )
}
