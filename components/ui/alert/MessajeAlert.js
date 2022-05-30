import { faExclamationCircle, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "reactstrap";
import useIcon from "../../../hooks/useIcon";

const MessajeAlert = ({ type, messaje, textAlert, typeIcon }) => {

  const { iconElement: exclamation } = useIcon(faExclamationCircle)
  const { iconElement: heart } = useIcon(faHeartBroken)

  let icon;

  switch (typeIcon) {
    case "warning":
      icon = exclamation;
      break;

    case "heart":
      icon = heart;
      break;

    default:
      icon = exclamation;
      break;
  }


  return (
    <Alert className="mt-5" color={type}>
      <span className="alert-inner--icon">
        <i>
          {icon}
        </i>
      </span>{" "}
      <span className="alert-inner--text">
        <strong>{textAlert}</strong> {messaje}
      </span>
    </Alert>
  );
}

export default MessajeAlert;
