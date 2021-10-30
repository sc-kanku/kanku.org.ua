import React from 'react';

export default function Photo({id, name, className, url, alt, editable, onChange}) {
    return (<>
        <p><img src={url} alt={alt} style={{width:'180px'}} /></p>

        <div class="mt-3">
            <label htmlFor={id} class="custom-file-upload btn-sm btn-outline-success ms-1">Змінити</label>
            <input id={id} name={name}  type="file" />
        </div>

        <p>Співвідношення висоти до ширини фото має бути 3:2</p>
    </>)
};