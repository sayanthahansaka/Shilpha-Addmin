import { toast, Slide } from "react-toastify"
import Toast from "../views/components/toasts/index"

export const error = (title, body, hideProgressBar, time) => {
  toast.error(<Toast title={title} body={body} />, {
    transition: Slide,
    hideProgressBar: hideProgressBar ? hideProgressBar : true,
    autoClose: time ? time : 5000
  })
}

export const success = (title, body, hideProgressBar, time) => {
  toast.success(<Toast title={title} body={body} />, {
    transition: Slide,
    hideProgressBar: hideProgressBar ? hideProgressBar : true,
    autoClose: time ? time : 5000
  })
}

export const warning = (title, body, hideProgressBar, time) => {
  toast.warning(<Toast title={title} body={body} />, {
    transition: Slide,
    hideProgressBar: hideProgressBar ? hideProgressBar : true,
    autoClose: time ? time : 5000
  })
}
