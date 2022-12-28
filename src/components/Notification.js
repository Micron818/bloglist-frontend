import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
const Notification = () => {
  const messageObj = useSelector(({ notification }) => notification.message)

  const { type, message } = { ...messageObj }

  return <div className={type}>{message}</div>
}

Notification.propTypes = {
  messageObj: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
}
export default Notification
