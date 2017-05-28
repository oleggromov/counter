import React from 'react'
import css from './message.css'

const defaultText = 'No error message is sent by the server'
const dismiss = 'Gotcha'

const noop = () => {}

const Message = props => {
  const bgClass = props.isInfo ? css.bgInfo : css.bgError
  const onClose = props.onClose || noop
  const onAfterClose = props.onAfterClose || noop
  const onDismissClick = () => {
    onClose()
    onAfterClose()
  }
  const rootClasses = props.isVisible
    ? `${css.root} ${css.show}`
    : css.root

  return (
    <div className={rootClasses}>
      <div className={bgClass} />

      <div className={css.message}>
        <div className={css.title}>{props.title}</div>
        <div className={css.text}>{props.text || defaultText}</div>

        <div className={css.dismiss}>
          <span className={css.dismissText} onClick={onDismissClick}>
            {dismiss}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Message
