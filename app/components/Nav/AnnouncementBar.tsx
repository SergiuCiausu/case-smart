import React from 'react'

const AnnouncementBar = ({ text, cod }: { text: string, cod: string }) => {
  return (
    <section
        className="accent-background w-full h-8 flex items-center justify-center">
            <p
                className="neutral-color nav-text">
                {text} <span className="bold">{`"${cod}"`}</span>
            </p>
    </section>
  )
}

export default AnnouncementBar