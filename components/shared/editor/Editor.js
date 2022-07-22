import React from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

function Editor({ value, onChange, className = "editor-styles w-100" }) {
  return (
    <QuillNoSSRWrapper
      className={className}
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  )
}

export default Editor
