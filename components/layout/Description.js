import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { MoreButton } from '../ui/button/MoreButton'
const DivMaxHeigth = styled.div`
div{
    transition: max-height 0.3s ease-out 0s;
    overflow: hidden;
}`

const Description = ({ html }) => {
    const [elementHeight, setElementHeight] = useState()
    const [show, setShow] = useState(false);
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const description = document.getElementById('height-element');
        setElementHeight(description.clientHeight);
        if (description.clientHeight > 200) {
            description.style.maxHeight = "200px";
            setShowButton(true)
        }
    }, [])

    useEffect(() => {
        document.getElementById('height-element').style.maxHeight = show ? `${elementHeight + 50}px` : "200px";
    }, [show])

    return (
        <>
            <DivMaxHeigth>
                <div id="height-element" dangerouslySetInnerHTML={{ __html: html }} />
            </DivMaxHeigth>
            {showButton && <MoreButton onClick={() => setShow(!show)}><div >{show ? 'less' : 'more'}</div></MoreButton>}
        </>
    );
}

export default Description;
