import { Modal } from 'reactstrap';
import { css } from '@emotion/core';

const ModalLoginOrRegister = ({ toggleModal, setToggleModal }) => {
    return (
        <Modal
            css={css`
            .modal-content{
                background: #101010;
            }
            .close > span:not(.sr-only){
                color: #fff;
            }
            .list-group-item{
                background-color: transparent;
                border-color: #232323;
            }
            .modal-header{
                border-bottom: none;
            }
            .modal-footer{
                border-top: none;
            }
        `}
            className="modal-dialog-centered"
            isOpen={toggleModal}
            toggle={() => setToggleModal(!toggleModal)} >
            <div className="modal-header align-items-center">
                <h5 className="modal-title" > Please Stop </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => setToggleModal(!toggleModal)}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body text-center">
                <h3>Login or Register</h3>
            </div>
            <div className="modal-footer">

            </div>
        </Modal>
    )
}

export default ModalLoginOrRegister
