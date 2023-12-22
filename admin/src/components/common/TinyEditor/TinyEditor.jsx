import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';
export default function TinyEditor({ handleChange, name, defaultValue }) {
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            handleChange(editorRef.current.getContent());
        }
    };
    useEffect(() => {
        if (editorRef.current && defaultValue !== undefined) {
            editorRef.current.setContent(defaultValue);
        }
    }, [defaultValue]);
    const handleUndoRedo = () => {
        log(); // Trigger the onChange event after undo or redo
    };

    const handleEditorInit = (evt, editor) => {
        editorRef.current = editor;
        editor.on('undo redo', handleUndoRedo);
        editor.setContent(defaultValue);
    };

    useEffect(() => {
        if (editorRef.current && defaultValue !== '') {
            editorRef.current.setContent(defaultValue);
        }
    }, [defaultValue, editorRef.current]);

    return (
        <>
            <Editor
                tagName={name}
                apiKey='ob2bst5rg8fd0hqhqaxcd9fln8ydipgsidblxo0aakpn3d1c'
                onInit={handleEditorInit}

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
                onBlur={log}
            />
        </>
    );
}
