import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
export default function TinyEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const handleUndoRedo = () => {
        log(); // Trigger the onChange event after undo or redo
    };
    return (
        <>
            <Editor
                apiKey='ob2bst5rg8fd0hqhqaxcd9fln8ydipgsidblxo0aakpn3d1c'
                onInit={(evt, editor) => {
                    editorRef.current = editor;
                    editor.on('undo redo', handleUndoRedo);
                }}

                init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks',
                        'insertdatetime', 'media', 'table', 'code', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px, background-color: red}',
                }}
                onChange={log}
            />
        </>
    );
}