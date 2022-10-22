import React from 'react'

export const ResultArea = ({ res }) => {

    return (
        <div className='flex-colum w-100'>
            <h3> Result Area </h3>
            <section className='result-area'>
                <p className='p-3 m-3'>{res}</p>
            </section>
        </div>
    )
}
