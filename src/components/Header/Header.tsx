import { Link } from "react-router"
import { GenresIcon, SearchIcon, UserIcon } from "@assets/icons"
import "./Header.scss"
import { useCallback, useContext, useState, memo, useEffect } from "react"
import { AllMoviesContext } from "../../App"
import type { Movie } from "../../models"
import { Logo, SearchContent } from "../Other"
import { Overlay } from "@ui-kit/Overlay"
import { Modal } from "@ui-kit/Modal"
import { AuthModal } from "../Auth"
import { useSessionContext } from "@contexts/Session"
import { GetName } from "../../utils"

interface AuthLinkProps {
  text: string
  onClick?: (e: React.MouseEvent) => void
  link: string
}

interface HeaderProps {
  isOpenModalAuth: boolean
  onAuthModalClose: () => void
}

// Мемоизированные иконки
const SearchIconMemo = memo(SearchIcon)
const GenresIconMemo = memo(GenresIcon)
const LogoMemo = memo(Logo)
const UserIconMemo = memo(UserIcon)
const AuthModalMemo = memo(AuthModal)

// Мемоизированные компоненты ссылок
const MainLink = memo(() => (
  <Link to="/" className="header__link" aria-label="Вернуться на главную">
    Главная
  </Link>
))

const GenresLink = memo(() => (
  <Link to="/genres" className="header__link" aria-label="Перейти к жанрам">
    <span className="header__link-title">Жанры</span>
    <GenresIconMemo />
  </Link>
))

const AuthLink = memo(({ text, onClick, link }: AuthLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (link === "") {
      e.preventDefault()
      if (onClick) onClick(e)
    }
  }

  return (
    <Link
      to={link}
      className="header__btn"
      onClick={handleClick}
      aria-label={text || "Авторизация"}
    >
      <span className="header__btn-span">{text}</span>
      <UserIconMemo />
    </Link>
  )
})

export const Header = ({ isOpenModalAuth, onAuthModalClose }: HeaderProps) => {
  const [movies] = useContext(AllMoviesContext)
  const { profile } = useSessionContext()

  const [searchResult, setSearchResult] = useState<Movie[]>([])
  const [searchState, setSearchState] = useState({
    isOpenWrapper: false,
    isOpenOverlay: false,
    isMobileVisible: false,
    isVisibleMobileIcon: true,
    isVisibleIconIntoInput: true,
  })
  const [authState, setAuthState] = useState({
    authLink: "",
    isOpenModal: false,
    isOpenOverlay: false,
  })
  const [searchValue, setSearchValue] = useState("")

  // открытие модального окна
  const handleAuthBtn = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      if (profile) {
        setAuthState(prev => ({
          ...prev,
          authLink: "/profile",
        }))
      } else {
        setAuthState(prev => ({
          ...prev,
          isOpenModal: true,
          isOpenOverlay: true,
          authLink: "",
        }))
      }
    },
    [profile],
  )

  const filterMovies = useCallback(
    (term: string) => {
      if (!movies) return []
      return movies.movies.filter((movie: { title: string }) =>
        movie.title.toLowerCase().includes(term.toLowerCase()),
      )
    },
    [movies],
  )

  // функция поиска
  const handleSearchChange = useCallback(
    async (e: { target: { value: string } }) => {
      const searchTerm = e.target.value
      setSearchValue(searchTerm)

      if (searchTerm) {
        setSearchResult(filterMovies(searchTerm))
        setSearchState(prev => ({
          ...prev,
          isOpenWrapper: true,
          isOpenOverlay: true,
          isVisibleIconIntoInput: false,
        }))
        setAuthState(prev => ({
          ...prev,
          isOpenOverlay: false,
        }))
      } else {
        setSearchState(prev => ({
          ...prev,
          isOpenWrapper: false,
          isOpenOverlay: false,
          isMobileVisible: false,
          isVisibleIconIntoInput: true,
        }))
      }
    },
    [filterMovies],
  )

  // добавление кнопки поиска на мобилке
  const handleMobileSearchBtn = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isOpenOverlay: true,
      isMobileVisible: true,
    }))
    setSearchValue("")
  }, [])

  const closeOverlay = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        setSearchState(prev => ({
          ...prev,
          isOpenWrapper: false,
          isOpenOverlay: false,
          isMobileVisible: false,
        }))
        setAuthState(prev => ({
          ...prev,
          isOpenModal: false,
          isOpenOverlay: false,
        }))
        onAuthModalClose()
      }
    },
    [onAuthModalClose],
  )

  // очистка search, закрытие всех модальных окон при клике на item результата поиска
  const searchContentClick = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isOpenWrapper: false,
      isOpenOverlay: false,
      isVisibleIconIntoInput: true,
      isVisibleMobileIcon: true,
    }))
    setSearchValue("")
  }, [])

  const closeModal = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      isOpenOverlay: false,
    }))
    setAuthState(prev => ({
      ...prev,
      isOpenModal: false,
    }))
    onAuthModalClose()
  }, [onAuthModalClose])

  useEffect(() => {
    // нажатие на лайк открывает модалку
    if (isOpenModalAuth) {
      setAuthState(prev => ({
        ...prev,
        isOpenModal: true,
        isOpenOverlay: true,
        authLink: "",
      }))
    }
    if (profile) {
      setAuthState(prev => ({
        ...prev,
        authLink: "/profile",
        isOpenModal: false,
        isOpenOverlay: false,
      }))
    }
  }, [isOpenModalAuth, profile])

  return (
    <header className="header">
      <div className="container">
        <div className="header__content content-common">
          <LogoMemo />
          <ul className="header__list">
            <li className="header__list-item">
              <MainLink />
            </li>
            <li className="header__list-item">
              <GenresLink />
            </li>
            <li
              className={`header__list-item header__search ${searchState.isMobileVisible ? "visible" : ""}`}
              id="headerSearchBlock"
            >
              <SearchIconMemo
                isVisibleIcon={searchState.isVisibleIconIntoInput}
                className={"header__search-icon"}
              />
              <input
                type="search"
                className="header__search-input"
                placeholder="Поиск"
                id="headerSearch"
                aria-label="Поиск фильмов"
                onChange={handleSearchChange}
                value={searchValue}
              />
              {
                <SearchContent
                  searchResult={searchResult}
                  isOpenWrapper={searchState.isOpenWrapper}
                  onClick={searchContentClick}
                />
              }
            </li>
          </ul>
          <button
            className="header__search-btn"
            onClick={handleMobileSearchBtn}
            id="searchBtnMobile"
            aria-label="Поиск фильмов"
          >
            <SearchIconMemo
              isVisibleIcon={searchState.isVisibleMobileIcon}
              className={"header__search-btn-icon"}
            />
          </button>
          <AuthLink
            onClick={handleAuthBtn}
            text={GetName(profile)}
            link={authState.authLink}
          />
        </div>
      </div>
      <Modal isOpen={authState.isOpenModal} onClose={closeModal}>
        <>
          <AuthModalMemo />
          <Overlay
            isOpenOverlay={authState.isOpenOverlay}
            closeOverlay={closeOverlay}
            className={authState.isOpenModal ? "overlay_auth" : ""}
          />
        </>
      </Modal>
      <Overlay
        isOpenOverlay={searchState.isOpenOverlay}
        closeOverlay={closeOverlay}
      />
    </header>
  )
}
