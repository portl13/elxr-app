import { css } from "@emotion/core";

const ProfilePicture = ({ alt, size = "small", ...props }) => {
  const sizeMap = {
    small: 30,
    medium: 50,
    large: 80,
  };

  return (
    <img
      alt={alt}
      css={css`
        width: ${sizeMap[size]}px;
        height: ${sizeMap[size]}px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 8px;
        box-sizing: border-box;
        background-image: linear-gradient(
          124.74deg,
          #00e0fc 2.17%,
          #ff73f8 50.65%,
          #f5d1b5 100%
        );
        padding: 1px;
      `}
      {...props}
    />
  );
};

export default ProfilePicture;
