import { useSelector } from 'react-redux'

const Notification = () => {
  const [text, status] = useSelector(state => state.notification)
  return (
    <div className='notification-container'>
      {text === null ?
        null :
        <div
          aria-label={`notification: ${text}`}
          aria-live='assertive'
          id='notification'
          className={`notification ${status ? '_' + status : null}`}
        >
          {text}
        </div>
      }
    </div>
  )
}

export default Notification
