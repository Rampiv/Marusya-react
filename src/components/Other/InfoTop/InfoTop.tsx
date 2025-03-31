import { type FC, useMemo } from "react";
import type { Movie } from "../../../models";
import { getTimeFromMins } from "../../../utils";
import { Rating } from "../Rating";
import "./InfoTop.scss";

interface InfoTopProps {
  movie: Movie;
  size?: "small" | "big"; 
}

export const InfoTop: FC<InfoTopProps> = ({ movie, size = "big" }) => {

  const { listClass, itemClass, genreListClass, genreItemClass, ratingSize } = useMemo(() => {
    const isSmall = size === "small";
    return {
      listClass: isSmall ? "infotop-small" : "infotop",
      itemClass: isSmall ? "infotop-small__item" : "infotop__item",
      genreListClass: isSmall ? "infotop-small__genre" : "infotop__genre",
      genreItemClass: isSmall ? "infotop-small__genre-item" : "infotop__genre-item",
      ratingSize: size
    };
  }, [size]);

  const genresList = useMemo(() => (
    <ul className={genreListClass}>
      {movie.genres.map((genre) => (
        <li key={genre} className={genreItemClass}>
          {genre}
        </li>
      ))}
    </ul>
  ), [movie.genres, genreListClass, genreItemClass]);

  return (
    <ul className={listClass} aria-label="Информация о фильме">
      <li className={itemClass}>
        <Rating movie={movie} size={ratingSize} />
      </li>
      <li className={itemClass}>{movie.releaseYear}</li>
      <li className={itemClass}>
        {genresList}
      </li>
      {movie.runtime && (
        <li className={itemClass}>{getTimeFromMins(movie.runtime)}</li>
      )}
    </ul>
  );
};