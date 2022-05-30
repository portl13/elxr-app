import React, { useState } from 'react'
import { htmlToText } from 'html-to-text';
import TruncateMarkup from 'react-truncate-markup';

const readMoreEllipsis = (truncate, setTruncate) => (
    <span>
        <span onClick={() => setTruncate(!truncate)} style={{
            color: '#e0116d',
            marginLeft: '5px',
            cursor: 'pointer'
        }} >
            ...read more
        </span>
    </span>
);

export default function ShowMoreText({ text, line }) {
    const [truncate, setTruncate] = useState(true)

    const clean = htmlToText(text, {
        wordwrap: null
    });

    return (
        <>
            {truncate ?
                (
                    <TruncateMarkup

                        lineHeight={line}
                        ellipsis={readMoreEllipsis(truncate, setTruncate)}
                    >
                        <div>
                            {clean}
                        </div>
                    </TruncateMarkup>
                ) :
                (
                    <>
                        <div dangerouslySetInnerHTML={{ __html: text }} />
                        <span>
                            <span onClick={() => setTruncate(!truncate)} style={{
                                color: '#e0116d',
                                marginLeft: '5px',
                                cursor: 'pointer'
                            }} >
                                less
                            </span>
                        </span>
                    </>
                )
            }
        </>
    )
}
