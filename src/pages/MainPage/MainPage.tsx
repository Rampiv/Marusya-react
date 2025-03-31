import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Hero, Loader, TopMovies } from "../../components"
import Api from "../../api/api"
import { Button } from "@ui-kit/Button"
import type { Movie } from "../../models"
import { FillHeartIcon, HeartIcon, RefreshIcon } from "@assets/icons"
import { Modal } from "@ui-kit/Modal"
import { YoutubeFrame } from "@ui-kit/YoutubeFrame"
import { GetYoutubeVideoIdByURL } from "../../utils"
import { Overlay } from "@ui-kit/Overlay"
import { MainPageContext } from "../../App"

const HeroMemo = React.memo(Hero)
const TopMoviesMemo = React.memo(TopMovies)
const FillHeartIconMemo = React.memo(FillHeartIcon)
const HeartIconMemo = React.memo(HeartIcon)

export const MainPage = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenOverlay, setIsOpenOverlay] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const profile = useContext(MainPageContext)[1]

  useEffect(() => {
    Api.getRandomMovie()
      .then(res => {
        setIsLoading(false)
        setRandomMovie(res)

        if (!res?.id || !profile) return

        Api.getProfile().then(profileRes => {
          const isMovieFavorite = profileRes?.favorites?.includes(
            String(res.id),
          )
          setIsFavorite(!!isMovieFavorite)
        })
      })
      .catch(err => {
        setIsLoading(false)
        console.log("Ошибка", err)
      })
  }, [profile])

  const handleRefresh = async () => {
    Api.getRandomMovie()
      .then(res => {
        setRandomMovie(res || null)
      })
      .catch(err => {
        console.log("err", err)
      })
  }

  const handleTrailer = () => {
    setIsModalOpen(true)
    setIsOpenOverlay(true)
  }
  const handleFavourite = useCallback(() => {
    if (!isFavorite) {
      Api.addFavorite(String(randomMovie?.id))
      setIsFavorite(true)
    }
  }, [isFavorite, randomMovie?.id])

  const closeModal = () => {
    setIsModalOpen(false)
    setIsOpenOverlay(false)
  }
  const closeOverlay = () => {
    setIsOpenOverlay(false)
    setIsModalOpen(false)
  }

  const buttons = useMemo(
    () => [
      <Button
        children="Трейлер"
        onClick={handleTrailer}
        type="btn-type1"
        url=""
      />,
      <Button
        children="О фильме"
        onClick={() => {}}
        type="btn-type2"
        url={`/movie/${randomMovie?.id}`}
      />,
      <Button onClick={handleFavourite} type="btn-type3" url="">
        {isFavorite ? <FillHeartIconMemo /> : <HeartIconMemo />}
      </Button>,
      <Button onClick={handleRefresh} type="btn-type3" url="">
        <RefreshIcon />
      </Button>,
    ],
    [handleFavourite, isFavorite, randomMovie?.id],
  )

  if (isLoading || !randomMovie) {
    return <Loader />
  }

  return (
    <>
      <HeroMemo btns={buttons} movie={randomMovie} />

      <TopMoviesMemo />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <>
          <YoutubeFrame
            videoId={GetYoutubeVideoIdByURL(randomMovie.trailerUrl)}
          />
          <Overlay isOpenOverlay={isOpenOverlay} closeOverlay={closeOverlay} />
        </>
      </Modal>
    </>
  )
}
