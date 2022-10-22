import React from 'react'
import Editor from '@monaco-editor/react'

const componentName = 'EA';

export const EditingArea = ({ onChange, code }) => {

    const handleEditorChange = (value) => {
        onChange(componentName, value);
    };

    return (
        <>
            <h4> Editing Area</h4>
            <Editor
                className='mt-1 mb-1 border border-2 rounded-3'
                height='35vh'
                width={`100%`}
                language='xml'
                value={code}
                onChange={handleEditorChange}
                defaultValue='// A test comment'
            />
        </>
    )
}
