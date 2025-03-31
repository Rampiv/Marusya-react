import { useParams } from "react-router"
import { Hero, Loader } from "../../components"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import Api from "../../api/api"
import type { Movie } from "../../models"
import "./MoviePage.scss"
import { GetYoutubeVideoIdByURL, NumberWithCommas } from "../../utils"
import { Button } from "@ui-kit/Button"
import { Modal } from "@ui-kit/Modal"
import { YoutubeFrame } from "@ui-kit/YoutubeFrame"
import { Overlay } from "@ui-kit/Overlay"
import { FillHeartIcon, HeartIcon } from "@assets/icons"

const MemoizedHero = memo(Hero)
const MemoizedYoutubeFrame = memo(YoutubeFrame)
const FillHeartIconMemo = memo(FillHeartIcon)
const HeartIconMemo = memo(HeartIcon)

export const MoviePage = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState<Movie>()
  const [noInfo] = useState("Нет информации")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenOverlay, setIsOpenOverlay] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (id) {
      Api.getIdMovie(id).then(res => {
        if (res) {
          setMovie(res)
          setIsLoading(false)
        } else setIsLoading(true)
      })
    } else setIsLoading(true)
  }, [id])

  const handleTrailer = () => {
    setIsModalOpen(true)
    setIsOpenOverlay(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const closeOverlay = () => {
    setIsOpenOverlay(true)
    setIsModalOpen(false)
  }
  const handleFavourite = useCallback(() => {
    if (!isFavorite) {
      Api.addFavorite(String(id))
      setIsFavorite(true)
    }
  }, [isFavorite, id])

  useEffect(() => {
    Api.getProfile().then(res => {
      const isMovieFavorite = res?.favorites?.includes(String(id))
      setIsFavorite(!!isMovieFavorite)
    })
  }, [id])

  const buttons = useMemo(
    () => [
      <Button
        children={"Трейлер"}
        onClick={handleTrailer}
        type={"btn-type1"}
        url={""}
        key={"trailerbtn"}
      />,
      <Button
        onClick={handleFavourite}
        type={"btn-type3"}
        url={``}
        key={"faviuritebtn"}
      >
        {isFavorite ? <FillHeartIconMemo /> : <HeartIconMemo />}
      </Button>,
    ],
    [handleFavourite, isFavorite],
  )

  const movieDetails = useMemo(
    () => [
      { label: "Язык оригинала", value: movie?.language },
      {
        label: "Бюджет",
        value: movie?.budget
          ? NumberWithCommas(Number(movie.budget))
          : undefined,
      },
      {
        label: "Выручка",
        value: movie?.revenue
          ? NumberWithCommas(Number(movie.revenue))
          : undefined,
      },
      { label: "Режиссёр", value: movie?.director },
      { label: "Продакшен", value: movie?.production },
      { label: "Награды", value: movie?.awardsSummary },
    ],
    [movie],
  )
  if (isLoading) return <Loader />
  if (!movie) return <div>Фильм не найден</div>

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <MemoizedHero btns={buttons} movie={movie} />
      <section className="about">
        <div className="container">
          <div className="about__content content-common">
            <h2 className="h2-common">О Фильме</h2>
            <ul className="about__list">
              {movieDetails.map((detail, index) => (
                <li
                  key={`${detail.label}-${index}`}
                  className="about__list-item"
                >
                  <div className="about__left">
                    <p className="about__param">{detail.label}</p>
                    <div className="about__dot" />
                  </div>
                  <div className="about__right">{detail.value ?? noInfo}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <>
            <MemoizedYoutubeFrame
              videoId={GetYoutubeVideoIdByURL(movie.trailerUrl)}
            />
            <Overlay
              isOpenOverlay={isOpenOverlay}
              closeOverlay={closeOverlay}
            />
          </>
        </Modal>
      </section>
    </>
  )
}
