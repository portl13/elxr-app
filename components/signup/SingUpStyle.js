import css from '@emotion/css'

export const formStyle = css`
  border-radius: 20px;
  padding: 1rem;
  position: relative;
  @media(min-width:768px) {
      padding: 4rem 4rem 1rem;
  }
  header {
    margin-bottom: 45px;
  }
  .form-sub-title {
    color: #cccccc;
    font-size: 16px;
  }
  .form-title {
    font-size: 25px;
  }
  Label {
    color: #cccccc;
  }
  .form-input {
    background-color: #2f3858;
    border-radius: 7px;
    border-color: #2f3858;
    color: #fff;
  }
  .form-text {
    color: #ccc;
    font-size: 12px;
  }
  .btn-submit{
    border-radius: 25px;
  }
  .line-one{
      line-height: 1;
  }
  .icon-button{
      width: 10px;
  }
  .btn-back{
      position: absolute;
      left: 0;
      top: 20px;
      color: #ccc;
  }
  textarea{
    min-height: 100px;
  }
`

export const containerStyle = css`
    margin-top: 75px;
    @media(min-width:768px){
        justify-content: center;
    }
`
export const titleCss = css`
  .sub-title {
    font-size: 20px;
    color: #cccccc;
  }
  .title {
    font-size: 37px;
    font-weight: 900;
    margin-bottom: 50px;
  }
`

export const bodyCss = css`
  @media (min-width: 992px) {
    justify-content: center;
  }
  .account-card {
    margin-bottom: 30px;
    cursor: pointer;
  }
  header {
    background-color: #131d32;
    border-radius: 5px;
    margin-bottom: 15px;
  }
  .title-card {
    font-size: 16px;
    font-weight: 900;
    text-align: center;
  }
  .title-content {
    display: table;
    text-transform: uppercase;
    background: linear-gradient(
      90deg,
      rgba(200, 71, 236, 1) 0%,
      rgba(213, 71, 192, 1) 25%,
      rgba(230, 71, 137, 1) 50%,
      rgba(248, 165, 99, 1) 75%,
      rgba(255, 201, 84, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 50px;
    font-weight: 900;
  }
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0;
  }
`