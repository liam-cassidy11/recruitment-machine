import React from "react";
import SectionHeading from "../shared/sectionHeading";

// Handles every common way someone might paste a YouTube link:
//   https://www.youtube.com/watch?v=XXXX      (standard watch URL)
//   https://youtu.be/XXXX                      (shortened share link)
//   https://www.youtube.com/shorts/XXXX         (YouTube Shorts)
//   https://www.youtube.com/embed/XXXX          (already an embed URL)
//   https://m.youtube.com/watch?v=XXXX          (mobile link)
function toEmbedUrl(url) {
  if (!url) return null;

  let videoId = null;

  // Standard/mobile watch URL: ?v=XXXX (possibly with other params after it)
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) videoId = watchMatch[1];

  // Shortened youtu.be/XXXX link
  if (!videoId) {
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) videoId = shortMatch[1];
  }

  // YouTube Shorts URL
  if (!videoId) {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch) videoId = shortsMatch[1];
  }

  // Already an /embed/ URL — use as-is
  if (!videoId) {
    const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) videoId = embedMatch[1];
  }

  if (videoId) return `https://www.youtube.com/embed/${videoId}`;

  // Not a recognizable YouTube URL (e.g. a Hudl link) — pass through
  // and let the browser attempt to load it directly.
  return url;
}

export default function VideoHighlights({ athlete }) {
  const embedUrl = toEmbedUrl(athlete?.video_url);
  if (!embedUrl) return null;

  return (
    <section id="video">
      <SectionHeading eyebrow="Eye test" title="Game film" />
      <div className="video-wrap">
        <iframe
          src={embedUrl}
          title={`${athlete.name} softball highlights`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}