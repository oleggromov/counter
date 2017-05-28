import React from 'react'
import css from './message.css'

const dismiss = 'Gotcha'

const Message = (props) => {
  let rootClasses = css.root

  if (props.title) {
    rootClasses = `${rootClasses} ${css.show}`
  }

  return (
    <div className={rootClasses}>
      <div className={css.bg} />

      <div className={css.message}>
        <div className={css.title}>{props.title}</div>
        <div className={css.text}>{props.text || 'No error message is sent'}</div>

        <div className={css.dismiss}>
          <span className={css.dismissText} onClick={props.onClose}>
            {dismiss}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Message
