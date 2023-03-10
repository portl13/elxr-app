import css from "@emotion/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "reactstrap";

export const PageContainer = ({ ...props }) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${props.main
          ? `linear-gradient(160deg,var(--bg-page-top-left) 0%,var(--bg-page-bottom-right) 60%)`
          : 'rgb(248, 243, 248)'};
        flex-direction: ${props.flexDirection || "row"};
        min-height: 100%;
      `}
      {...props}
    />
  );
};

export const FormContainer = ({ ...props }) => {
  return (
    <form
      css={css`
        min-width: 500px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 58px 37px 41px;
        min-height: 100vh;
      `}
      {...props}
    />
  );
};

export const ImageContainer = (props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      `}
      {...props}
    />
  );
};

export const Image = (props) => {
  return (
    <img
      css={css`
        width: ${props.width}px;
        height: ${props.height || 180}px;
        margin-bottom: ${props.mb || 0}px;
      `}
      {...props}
    />
  );
};

export const ImageFluid = (props) => {
  return (
    <img
      css={css`
        width: ${props.width}px;
        height: auto;
        margin-bottom: ${props.mb || 0}px;
      `}
      {...props}
    />
  );
};

export const ImageBg = (props) => {
  return (
    <div
      css={css`
        width: ${props.width}px;
        height: ${props.height || 180}px;
        margin-bottom: ${props.mb || 0}px;
        background-image: url(${props.src});
        background-color: #8898aa;
        border-radius: 50%;
      `}
      {...props}
    />
  );
};

export const ImageTitle = (props) => {
  return (
    <h6
      css={css`
        font-weight: 400;
        font-size: 32px;
        text-align: center;
        text-decoration: underline;
        color: #ffffff;
        margin-bottom: 37px;
      `}
      {...props}
    />
  );
};

export const ImageText = (props) => {
  return (
    <p
      css={css`
        font-weight: 300;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        color: #ffffff;
        margin-bottom: 25px;
      `}
      {...props}
    />
  );
};

export const ImageTextPink = (props) => {
  return (
    <p
      css={css`
        font-weight: ${props.fontWeight || 300};
        font-size: ${props.fs || "22px"};
        text-align: center;
        line-height: 33px;
        color: #e93663;
      `}
      {...props}
    />
  );
};

export const Title = (props) => {
  return (
    <h2
      css={css`
        font-family: var(--font-oswald);
        font-weight: 400;
        font-size: 28px;
        line-height: 28px;
        color: var(--bg-font);
        margin-top: 36px;
        margin-bottom: 16px;
      `}
      {...props}
    />
  );
};

export const Subtitle = (props) => {
  return (
    <div
      css={css`
        text-align: center;
        font-weight: 300;
        font-size: 10px;
        line-height: 21px;
        color: #ffffff;
        margin-bottom: 32px;
      `}
      {...props}
    />
  );
};

export const InputContainer = ({ ...props }) => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 16px;
        span {
          color: #5f6368;
          font-weight: 400;
          font-size: 10.5px;
        }
      `}
      {...props}
    />
  );
};

export const TermsText = (props) => {
  return (
    <div
      css={css`
        margin-top: 30px;
        margin-bottom: 40px;
        text-align: center;
        font-weight: 300;
        font-size: 14px;
        line-height: 24px;
        color: var(--bg-font);

        a {
          text-decoration: underline;
        }
      `}
      {...props}
    />
  );
};

export const Copyright = (props) => {
  return (
    <div
      css={css`
        font-family: var(--font-oswald);
        margin-top: 53px;
        font-weight: 300;
        font-size: 10px;
        line-height: 10px;
        color: rgb(135, 131, 149);
      `}
      {...props}
    />
  );
};

export const PasswordWrapper = (props) => {
  return (
    <div
      css={css`
        position: relative;
      `}
      {...props}
    />
  );
};

export const EyeIconPassword = ({ isVisible, onClick }) => {
  return (
    <div
      css={css`
        position: absolute;
        right: 29px;
        top: 22px;
      `}
      onClick={onClick}
    >
      {isVisible ? (
        <FontAwesomeIcon
          icon={faEye}
          css={css`
            color: var(--bg-font);
            width: 20px;
          `}
        />
      ) : (
        <FontAwesomeIcon
          icon={faEyeSlash}
          css={css`
            color: var(--bg-font);
            width: 20px;
          `}
        />
      )}
    </div>
  );
};

export const InputDisclaimer = (props) => {
  return (
    <div
      css={css`
        margin-top: 4px;
        margin-left: 40px;
        font-weight: 300;
        font-size: 12px;
        line-height: 12px;
        color: #ffffff;
      `}
      {...props}
    />
  );
};

export const AgreeText = (props) => {
  return (
    <span
      css={css`
        font-family: var(--font-oswald);
        margin-top: 16px;
        font-weight: 300;
        font-size: 14px;
        line-height: 12px;
        color: var(--bg-font);

        span {
          text-decoration: underline;
          cursor: pointer;
        }
      `}
      {...props}
    />
  );
};

export const SignupCreatorText = (props) => {
  return (
    <span
      css={css`
        font-family: var(--font-oswald);
        font-weight: 400;
        font-size: 28px;
        line-height: 44px;
        color: var(--bg-font);
        text-align: center;
      `}
      {...props}
    />
  );
};

export const Button = (props) => {
  return (
    <button
      css={css`
        padding: 10px 40px;
        margin-top: 32px;
        background: linear-gradient(
          106.26deg,
          rgb(0, 224, 252) -20.69%,
          rgb(255, 115, 248) 59.13%,
          rgb(245, 209, 181) 101.63%
        );
        border: none;
        border-radius: 40px;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
      `}
      {...props}
    />
  );
};

export const ButtonSignupCreator = (props) => {
  return (
    <button
      css={css`
        padding: ${props.padding || "12px 48px"};
        margin-top: ${props.marginTop || "23px"};
        background: linear-gradient(0deg, #e93663, #e93663);
        border: none;
        border-radius: 30px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
      `}
      {...props}
    >
      {props.children}
    </button>
  );
};

export const CropperContainer = (props) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
      {...props}
    />
  );
};

export const AddPhoto = (props) => {
  return (
    <div
      css={css`
        width: 100px;
        height: 100px;
        background-color: #10173c;
        border-radius: 50px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 2px solid
          linear-gradient(135deg, #6141ea 0%, #b63a95 49.26%, #e93663 100%);
      `}
      {...props}
    />
  );
};

export const inputCSS = css`
  background-color: #10173c;
  border: 1px solid #294983;
  color: #ffffff;
  border-radius: 30px;
  box-shadow: none;
`;

export const BackButton = (props) => {
  return (
    <span
      css={css`
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
        text-align: start;
        cursor: pointer;
        padding-top: 70px;
        padding-left: 80px;
        align-self: flex-start;
        position: absolute;
        top: 0;
        left: 0;
        svg {
          width: 10px;
          height: 10px;
          margin-right: 10px;
        }
      `}
      {...props}
    />
  );
};

export const ModalTitle = (props) => {
  return (
    <h4
      css={css`
        font-size: 20px;
        font-weight: 400;
        color: var(--bg-font);
        text-align: start;
        padding-left: 20px;
        margin-bottom: 26px;
      `}
      {...props}
    />
  );
};

export const ModalText = (props) => {
  return (
    <p
      css={css`
        font-size: 13px;
        font-weight: 300;
        color: var(--bg-font);
        text-align: center;
        margin-bottom: 45px;
      `}
      {...props}
    />
  );
};

export const UseCameraButton = (props) => {
  return (
    <span
      css={css`
        font-size: 14px;
        font-weight: 400;
        color: #e93663;
        text-align: start;
        cursor: pointer;
        text-decoration-line: underline;
        margin-right: 16px;
      `}
      {...props}
    />
  );
};

export const SelectFileButton = (props) => {
  return (
    <input
      css={css`
        padding: 8px 26px;
        background: linear-gradient(0deg, #e93663, #e93663);
        border: none;
        border-radius: 30px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 400;
      `}
      {...props}
    />
  );
};

export const DropzoneContainer = (props) => {
  return (
    <div
      css={css`
        background: transparent;
        border: 2px dashed #dedfe2;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0;
        outline: none;
        outline-color: currentcolor;
        transition: border 0.24s ease-in-out;
        justify-content: center;
        margin-top: 16px;
      `}
      {...props}
    />
  );
};

export const ModalStyle = (props) => {
  return (
    <Modal
      css={css`
        .modal-content {
          border-radius: 10px !important;
        }

        .modal-header {
          border-bottom: 1px solid #294983 !important;
          background-color: #fff !important;
        }

        .modal-body {
          background-color: #fff !important;
        }

        .modal-footer {
          border-top: 1px solid #294983 !important;
          background-color: #fff !important;
        }
      `}
      {...props}
    />
  );
};
