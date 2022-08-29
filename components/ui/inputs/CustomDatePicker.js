import React, { forwardRef } from 'react';
import { Button, FormGroup } from 'reactstrap';
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import useIcon from '../../../hooks/useIcon';
import styled from '@emotion/styled';

const IconContainer = styled.i`
        width: 13px;
        height: 19px;
        display: inline-block;
        overflow: hidden;
`

const CustomDatePicker = ({ value, onClick, text, type, className }, ref) => {

    const { iconElement: calendar } = useIcon(faCalendarAlt)

    return (
        <FormGroup >
            <Button onClick={onClick} className="btn-icon btn-3 btn-block w-100 b-radius-25" type="button">
                <span className="btn-inner--icon">
                    <IconContainer>{calendar}</IconContainer>
                </span>
                <span className="btn-inner--text">
                    {text} {value}
                </span>
            </Button>
        </FormGroup>
    );
}

export default forwardRef(CustomDatePicker);
