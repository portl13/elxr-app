import styled from '@emotion/styled';


const GradientButton = styled.button`
  min-height: 60px;
  padding: 21px 20px 20px;
  border-radius: 30px;
  border: 0;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  line-height: normal;
  box-shadow: 0 10px 13px 0 rgba(33, 102, 227, 0.15);
  background-image: linear-gradient(96deg, #00e0fc -3%, #ff73f8 48%, #f5d1b5 99%);
  white-space: nowrap;
`;

// A new component based on Button, but with some override styles
const DarkButton = styled(GradientButton)`
  color: darkgrey;
  border-color: darkgrey;
`;

export default GradientButton;
