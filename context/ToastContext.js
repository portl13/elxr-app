import React, { createContext } from 'react'
import { positions, Provider as AlertProvider } from 'react-alert';

const TopRightAlertContext = createContext()

const AlertTemplate = ({ style, options, message, close }) => (
    <div style={style} className={options.type === 'success' ?
        'success-toast' : 'error-toast'} >
        {message}
        <button onClick={close}>+</button>
    </div>
)

const ToastContext = ({ children }) => {
    return (
        <AlertProvider template={AlertTemplate}>
            <AlertProvider
                template={AlertTemplate}
                position={positions.TOP_RIGHT}
                context={TopRightAlertContext}
            >
                {children}
            </AlertProvider>
        </AlertProvider>
    )
}


export default ToastContext;
