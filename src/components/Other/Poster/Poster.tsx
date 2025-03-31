import type { Movie } from "../../../models"
import posterDefault from "../../../assets/posterDefault.webp"
import "./Poster.scss"

export function Poster(value: Movie) {
  if (value.posterUrl || value.backdropUrl) {
    return (
      <img
        src={value.posterUrl ?? value.backdropUrl}
        alt="Постер фильма"
        className="poster"
      />
    )
  }
  return (
    <>
      <img
        src={posterDefault}
        alt="Постер фильма"
        className="poster poster_default"
      />
      <span className="poster-title-default">{value.title}</span>
    </>
  )
}
