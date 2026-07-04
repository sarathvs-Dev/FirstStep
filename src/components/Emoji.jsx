import { useMemo } from 'react'
import twemoji from 'twemoji'

/**
 * Renders emoji characters as crisp local Twemoji SVGs instead of relying on
 * the OS's own (often flat/low-contrast) emoji font. Assets live in
 * public/twemoji/, downloaded once — no network calls at runtime.
 * Sized via CSS to 1em so it drops into existing text-size classes.
 */
export default function Emoji({ text, className = '', ...rest }) {
  const html = useMemo(
    () =>
      twemoji.parse(text, {
        base: '/twemoji/',
        folder: '',
        ext: '.svg',
        callback: (icon, options) => `${options.base}${icon}${options.ext}`,
      }),
    [text]
  )

  return (
    <span
      className={`emoji-wrap ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      {...rest}
    />
  )
}
