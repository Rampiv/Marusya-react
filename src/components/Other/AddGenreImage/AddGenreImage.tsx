import "./AddGenreImage.scss"
import genresAdventure from "@assets/genresAdventure.webp"
import genresComedy from "@assets/genresComedy.webp"
import genresCrime from "@assets/genresCrime.webp"
import genresDrama from "@assets/genresDrama.webp"
import genresFamily from "@assets/genresFamily.webp"
import genresFantasy from "@assets/genresFantasy.webp"
import genresHistory from "@assets/genresHistory.webp"
import genresThriller from "@assets/genresThriller.webp"
import posterDefault from "@assets/posterDefault.webp"

export function AddGenreImage(item: string) {
  switch (item) {
    case "history":
      return (
        <img
          src={genresHistory}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "fantasy":
      return (
        <img
          src={genresFantasy}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "family":
      return (
        <img
          src={genresFamily}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "adventure":
      return (
        <img
          src={genresAdventure}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "comedy":
      return (
        <img
          src={genresComedy}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "crime":
      return (
        <img
          src={genresCrime}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "drama":
      return (
        <img
          src={genresDrama}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    case "thriller":
      return (
        <img
          src={genresThriller}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
    default:
      return (
        <img
          src={posterDefault}
          alt="фоновое изображение"
          className="genre-image"
        />
      )
  }
}
