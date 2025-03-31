import { useMemo, type FC } from "react"
import star from "../../../assets/star.svg"
import type { Movie } from "../../../models"
import "./Rating.scss"

interface RatingProps {
  movie: Movie
  size?: "small" | "big"
}

const getRatingColorClass = (rating: number): string => {
  if (rating >= 8.6) return "rating_yellow"
  if (rating >= 7.5) return "rating_green"
  if (rating >= 6.3) return "rating_grey"
  if (rating >= 4.2) return "rating_red"
  return ""
}

export const Rating: FC<RatingProps> = ({ movie, size = "big" }) => {
  const rating = Number(movie.tmdbRating) || 0

  const { containerClass, svgClass } = useMemo(
    () => ({
      containerClass: size === "small" ? "rating-small" : "rating",
      svgClass: size === "small" ? "rating-small__svg" : "rating__svg",
    }),
    [size],
  )

  const colorClass = useMemo(() => getRatingColorClass(rating), [rating])

  return (
    <div
      className={`${containerClass} ${colorClass}`}
      aria-label={`Рейтинг фильма: ${rating}`}
      title={`Рейтинг: ${rating}`}
    >
      <img
        src={star}
        alt="Звезда рейтинга"
        className={svgClass}
        aria-hidden="true"
      />
      {rating.toFixed(1)}
    </div>
  )
}
