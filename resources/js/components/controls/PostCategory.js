import React from 'react';

export default function PostCategory({value, editable, onChange}) {
    let key = value;

    let labels = {
        '6': 'Федерація кіокушинкай-карате України',
        '5': 'Громадська діяльність',
        '4': 'Літні табори',
        '3': 'Семінари',
        '2': 'Атестації',
        '1': 'Змагання',
        '7': 'WKO',
        '8': 'Клубне життя'
    };

    let markup = '';

    if (editable) {
        let options = Object.keys(labels).map(
            (key) => 
            <option key={key} value={key}>{labels[key]}</option>
        );

        markup = 
            <select value={key} className="form-select-sm" aria-label="Select Category" onChange={onChange}>
                {options}
            </select>
    } else {
        markup = <span className="degree">{labels[key]}</span>
    }

    return (markup)
}
