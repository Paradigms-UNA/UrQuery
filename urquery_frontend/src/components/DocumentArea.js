import Editor from '@monaco-editor/react';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'

const componentName='LA';


export const DocumentArea = ({onChange, documentXml}) => {

    const handleLoadChange = (value) => {
        onChange(componentName, value);
    };

    return (
    <div>
        <h4>Document Area</h4>
        <Editor
        className='mt-1 mb-2 border border-2 rounded-3'
         height='35vh'
         width={`100%`}
         language='xml'
        theme='vs-dark'
        onChange={handleLoadChange}
        value={documentXml}
        />
    </div>
    )
    //<button className="p-2 btn btn-primary" id='button-editor' type="button">Load</button>
}