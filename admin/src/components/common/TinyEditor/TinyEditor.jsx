import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
export default function TinyEditor({ handleChange, name }) {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            handleChange(editorRef.current.getContent());
        }
    };
    const handleUndoRedo = () => {
        log(); // Trigger the onChange event after undo or redo
    };
    return (
        <>
            <Editor
                tagName={name}
                apiKey='ob2bst5rg8fd0hqhqaxcd9fln8ydipgsidblxo0aakpn3d1c'
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                    editor.on('undo redo', handleUndoRedo);
                }}

                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | link bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px, background-color: red}',
                }}
                onChange={log}
            />
        </>
    );
}