import { OkIcon, TgIcon, VkIcon, YoutubeIcon } from "@assets/icons"
import "./Footer.scss"
import { Link } from "react-router"
import { memo } from "react"

const VkIconMemo = memo(VkIcon)
const YoutubeIconMemo = memo(YoutubeIcon)
const OkIconMemo = memo(OkIcon)
const TgIconMemo = memo(TgIcon)

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content content-common">
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link
                to="/"
                className="footer__link"
                target="_blank"
                aria-label={"Социальная сеть: Вконтакте"}
              >
                <VkIconMemo />
              </Link>
            </li>
            <li className="footer__list-item">
              <Link
                to="/"
                className="footer__link"
                target="_blank"
                aria-label={"Социальная сеть: Ютуб"}
              >
                <YoutubeIconMemo />
              </Link>
            </li>
            <li className="footer__list-item">
              <Link
                to="/"
                className="footer__link"
                target="_blank"
                aria-label={"Социальная сеть: Одноклассники"}
              >
                <OkIconMemo />
              </Link>
            </li>
            <li className="footer__list-item">
              <Link
                to="/"
                className="footer__link"
                target="_blank"
                aria-label={"Социальная сеть: Телеграм"}
              >
                <TgIconMemo />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
