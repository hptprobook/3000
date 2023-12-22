import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';

export default function TinyEditorMini({ onEditorChange, defaultValue }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && defaultValue !== undefined) {
            editorRef.current.setContent(defaultValue);
        }

    }, [defaultValue, editorRef.current]);

    const log = () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            onEditorChange(content);
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
                    editor.setContent(defaultValue);
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
                onBlur={log}
            />
        </>
    );
}
