import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useIcon = (icon, spin, size = "sm") => {

    const iconElement = <FontAwesomeIcon
        spin={spin}
        icon={icon}
        size={size} />

    return {
        iconElement
    }
}

export default useIcon;
