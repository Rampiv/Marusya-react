import { useCallback, useContext, useEffect, useState } from "react"
import "./ProfilePage.scss"
import { ProfilePageContext } from "../../App"
import { HeartIcon, UserIcon } from "@assets/icons"
import React from "react"
import Api from "../../api/api"
import { Loader } from "../../components"
import { CardsList, ErrorMessage, Setting } from "../../components/Other"
import type { Movie } from "../../models"
import { useNavigate } from "react-router"

const HeartIconMemo = React.memo(HeartIcon)
const UserIconMemo = React.memo(UserIcon)

export const ProfilePage = () => {
  const profile = useContext(ProfilePageContext)
  // при переходе сразу же после авторизации profile === null !!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log(profile);
  const [isLoading, setIsLoading] = useState(true)
  const [favoriteFilms, setFavoriteFilms] = useState<Movie[]>([])
  const [error, setError] = useState("")
  const [isSettings, setIsSettings] = useState(false)

  const fetchFavoriteFilms = useCallback(async (favorites: string[]) => {
    try {
      const films = await Promise.all(
        favorites.map(item => Api.getIdMovie(item)),
      )
      setFavoriteFilms(films)
    } catch (error) {
      console.error("Ошибка получения фильмов:", error)
      setError("Не удалось загрузить избранные фильмы")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDeleteFavorite = useCallback(
    async (id: number) => {
      setIsLoading(true)
      try {
        await Api.deleteFavorite(id)
        const updatedProfile = await Api.getProfile()
        if (updatedProfile) {
          fetchFavoriteFilms(updatedProfile.favorites)
        }
      } catch (error) {
        console.error("Ошибка удаления фильма:", error)
        setError("Не удалось удалить фильм")
        setIsLoading(false)
      }
    },
    [fetchFavoriteFilms],
  )

  let navigate = useNavigate()

  const logout = useCallback(async () => {
    setIsLoading(true)

    Api.logoutUser()
      .then(() => {
        navigate("/")
      })
      .catch(error => {
        console.error("Ошибка удаления фильма:", error)
      })
  }, [navigate])

  useEffect(() => {
    if (profile?.favorites) {
      fetchFavoriteFilms(profile.favorites)
    }
  }, [profile, fetchFavoriteFilms])

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__content content-common">
          <h2 className="h2-common">О Фильме</h2>
          <div className="profile__btn">
            <button
              className="profile__btn-common"
              onClick={() => {
                setIsSettings(false)
              }}
            >
              <HeartIconMemo />
              Избранные фильмы
            </button>
            <button
              className="profile__btn-common"
              onClick={() => {
                setIsSettings(true)
              }}
            >
              <UserIconMemo />
              Настройки аккаунта
            </button>
          </div>
          {error && (
            <ErrorMessage error={error} visible={error ? true : false} />
          )}
          {isLoading ? (
            <Loader />
          ) : isSettings ? (
            <Setting
              fullname={`${profile.name} ${profile.surname}`}
              email={profile.email}
              onClick={logout}
            />
          ) : (
            <CardsList
              MoviesList={favoriteFilms}
              ProfileProps={{
                ClassNameList: "profile__cards-list",
                ClassNameSpan: "hide",
                isDeleteBtn: true,
                onDelete: handleDeleteFavorite,
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
