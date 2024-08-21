import { Fragment } from "react"

const Toast = ({ title, body }) => (
    <Fragment>
        <div className='toastify-header'>
            <div className='title-wrapper'>
                <h6 className='toast-title font-weight-bold'>{title}</h6>
            </div>
        </div>
        <div className='toastify-body'>
            <span>{body}</span>
        </div>
    </Fragment>
)
export default Toast