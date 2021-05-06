import { toast, ToastContainer } from 'react-toastify';

const ToastMessage = ({ title, body = null, closeToast, toastProps }) => (
    <>
        {title}
        {body && (
            <small>
                <br />
                {body}</small>
        )}
    </>
)

const Toaster = ({ title, body = null, type = 'e', showing = true, timer = 3000 }) => {
    let defaultParams = {
        position: "bottom-left",
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    const ToastData = () => {
        return (
            <ToastMessage title={title} body={body} />
        )
    }

    if (showing) {
        if (type === 'e') toast.error(ToastData)
        else if (type === 's') toast.success(ToastData)
        else if (type === 'w') toast.warn(ToastData)
        else if (type === 'i') toast.info(ToastData)
    }
    return (
        <ToastContainer {...defaultParams} />
    );
}

export default Toaster;