import "./YoutubeFrame.scss"

interface Props {
  videoId: string | null
}
export const YoutubeFrame = ({ videoId }: Props) => {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  })

  return (
    <div className="youtube-frame">
      <iframe
        id="trailer"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title={`YouTube видео: ${videoId}`}
        width="100%"
        height="100%"
        loading="lazy"
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
      ></iframe>
    </div>
  )
}
