import React, { useEffect } from "react";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToPlain } from '../../pages/group/Discussion/MergeTopic'

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), { ssr: false });

const ToolbarStyle = {
    options: ["inline", "list", "blockType", 'textAlign', 'history', 'link'],
    inline: {
        inDropdown: false,
        options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
    blockType: {
        inDropdown: false,
        options: ['Blockquote'],
    },
    list: {
        inDropdown: false,
        options: ['unordered', 'ordered'],
    },
    link: {
        inDropdown: false,
        options: ['link'],
        linkCallback: undefined
    },
}

const TextEditor = ({ editorState, setEditorState, setContentHtml, editorVal }) => {
    const htmlToDraft =
        typeof window === "object" && require("html-to-draftjs").default;
    const updateHtmlContent = () => {
        let str = convertToPlain(editorVal).trim()
        if (str) {
            const contentBlock = htmlToDraft(editorVal);
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            setContentHtml(editorVal);
            const editorStateVal = EditorState.createWithContent(contentState);
            setEditorState(editorStateVal);
        }
    }
    useEffect(() => {
        editorVal && updateHtmlContent()
    }, [])
    return (
        <Editor
            editorState={editorState}
            onChange={() => {
                setContentHtml(
                    draftToHtml(convertToRaw(editorState.getCurrentContent()))
                );
            }}
            editorStyle={{
                color: 'black',
                border: "none"
            }}
            toolbar={ToolbarStyle}
            toolbarStyle={{
                color: 'black',
                border: "none",
                backgroundColor: "#F6F7F7",
                height: "35px"
            }}
            onEditorStateChange={setEditorState}
        />
    );
};
export default TextEditor;
