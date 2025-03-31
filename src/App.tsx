import { Route, Routes } from "react-router"
import { Footer, Header, Loader } from "./components"
import React, { createContext, useEffect, useMemo, useState } from "react"
import Api from "./api/api"
import { GenresPage, MainPage, MoviePage, ProfilePage } from "./pages"
import "./App.scss"
import type { Profile } from "./models"

export const MainPageContext = createContext<any>(undefined)
export const GenresContext = createContext<any>(undefined)
export const AllMoviesContext = createContext<any>(undefined)
export const ProfilePageContext = createContext<any>(undefined)

const HeaderMemo = React.memo(Header)
const MainPageMemo = React.memo(MainPage)
const GenresPageMemo = React.memo(GenresPage)
const MoviePageMemo = React.memo(MoviePage)
const ProfilePageMemo = React.memo(ProfilePage)

export default function App() {
  const [topMovies, setTopMovies] = useState()
  const [genres, setGenres] = useState()
  const [movies, setMovies] = useState()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  //memo
  const topMoviesMemo = useMemo(() => ({ topMovies }), [topMovies])
  const genresMemo = useMemo(() => ({ genres }), [genres])
  const moviesMemo = useMemo(() => movies, [movies])
  const profileMemo = useMemo(() => profile, [profile])

  useEffect(() => {
    // получаю все данные для контекста
    const fetchData = async () => {
      try {
        const [topMoviesRes, genresRes, moviesRes] = await Promise.all([
          Api.getTopMovies(),
          Api.getGenres(),
          Api.getAllMovies(),
        ])
        setTopMovies(topMoviesRes)
        setGenres(genresRes)
        setMovies(moviesRes)
      } catch (error) {
        console.error("Ошибка загрузки:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

    // если добавить строчку ниже, то авторизация при перезагрузке страницы будет сбрасываться. !!!!!!!!!!!!!!!!!
    // if (!profile) return
    Api.getProfile().then(res => {
      if (res) {
        if (JSON.stringify(res) !== JSON.stringify(profile)) {
          setProfile(res);
        }
      }
    })
  }, [profile])

  return (
    <div className="App">
      <AllMoviesContext.Provider value={[moviesMemo, profileMemo]}>
        <HeaderMemo />
      </AllMoviesContext.Provider>
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              isLoading ? (
                <Loader />
              ) : (
                <MainPageContext.Provider value={[topMoviesMemo, profileMemo]}>
                  <MainPageMemo />
                </MainPageContext.Provider>
              )
            }
          />
          <Route
            path="/genres"
            element={
              isLoading ? (
                <Loader />
              ) : (
                <GenresContext.Provider value={genresMemo}>
                  <GenresPageMemo />
                </GenresContext.Provider>
              )
            }
          />
          <Route path="/movie/:id" element={<MoviePageMemo />} />
          <Route
            path="/profile"
            element={
              isLoading ? (
                <Loader />
              ) : (
                <ProfilePageContext.Provider value={profileMemo}>
                  <ProfilePageMemo />
                </ProfilePageContext.Provider>
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
