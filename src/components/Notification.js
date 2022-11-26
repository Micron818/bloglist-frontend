import PropTypes from 'prop-types'
const Notification = ({ messageObj }) => {
  if (!messageObj) return
  const { type, message } = { ...messageObj }
  return (
    <div className={type}>
      {type}: {message}
    </div>
  )
}

Notification.propTypes = {
  messageObj: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
}
export default Notification
