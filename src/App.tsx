import { Route, Routes } from "react-router"
import { Footer, Header, Loader } from "./components"
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import Api from "./api/api"
import {
  GenresFilterPage,
  GenresPage,
  MainPage,
  MoviePage,
  ProfilePage,
} from "./pages"
import "./App.scss"
import { SessionContextProvider } from "@contexts/Session"

export const MainPageContext = createContext<any>(undefined)
export const GenresContext = createContext<any>(undefined)

const HeaderMemo = React.memo(Header)
const MainPageMemo = React.memo(MainPage)
const GenresPageMemo = React.memo(GenresPage)
const MoviePageMemo = React.memo(MoviePage)
const ProfilePageMemo = React.memo(ProfilePage)
const GenresFilterPageMemo = React.memo(GenresFilterPage)

export default function App() {
  const [topMovies, setTopMovies] = useState()
  const [genres, setGenres] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isOpenModalAuth, setIsModalOpen] = useState(false)

  //memo
  const topMoviesMemo = useMemo(() => ({ topMovies }), [topMovies])
  const genresMemo = useMemo(() => ({ genres }), [genres])

  useEffect(() => {
    // получаю все данные для контекста
    const fetchData = async () => {
      try {
        const [topMoviesRes, genresRes] = await Promise.all([
          Api.getTopMovies(),
          Api.getGenres(),
        ])
        setTopMovies(topMoviesRes)
        setGenres(genresRes)
      } catch (error) {
        console.error("Ошибка загрузки:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // всплытие состояния из MainPage в Header, чтобы без авторизации нельзя было добавить фильм в favorite
  const FavoriteCallback = useCallback((value: "open" | "close") => {
    setIsModalOpen(value === "open")
  }, [])
  // обработчик закрытия модалки
  const handleCloseAuthModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <SessionContextProvider>
      <div className="App">
        <HeaderMemo
          isOpenModalAuth={isOpenModalAuth}
          onAuthModalClose={handleCloseAuthModal}
        />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                isLoading ? (
                  <Loader />
                ) : (
                  <MainPageContext.Provider value={[topMoviesMemo]}>
                    <MainPageMemo FavoriteCallback={FavoriteCallback} />
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
            <Route
              path="/genres/:genre"
              element={isLoading ? <Loader /> : <GenresFilterPageMemo />}
            />
            <Route
              path="/movie/:id"
              element={<MoviePageMemo FavoriteCallback={FavoriteCallback} />}
            />
            <Route
              path="/profile"
              element={isLoading ? <Loader /> : <ProfilePageMemo />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </SessionContextProvider>
  )
}
