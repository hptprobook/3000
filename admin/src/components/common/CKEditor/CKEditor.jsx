import React from 'react';
import './style.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const CKEditorComponent = () => {
    const editorConfig = {
        // Add plugins or custom configurations here
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Tiêu đề 1 ', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Tiêu đề 2 ', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Tiêu đề 3 ', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Tiêu đề 4 ', class: 'ck-heading_heading4' },
            ],
        },
    };
    return (
        <div className="CKeditor">
            <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor&nbsp;5!</p>"
                config={editorConfig}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    )
}

export default CKEditorComponent