import React from 'react';

export default function Degree({value, editable, onChange}) {
    let key = value;
    let style = "url(/images/degrees/dan-" + key + ".gif)";
    let labels = {
        '6': '6 дан',
        '5': '5 дан',
        '4': '4 дан',
        '3': '3 дан',
        '2': '2 дан',
        '1': '1 дан',
        '-1': '1 кю',
        '-2': '2 кю',
        '-3': '3 кю',
        '-4': '4 кю',
        '-5': '5 кю',
        '-6': '6 кю',
        '-7': '7 кю',
        '-8': '8 кю',        
        '-9': '9 кю',
        '-10': '10 кю'
    };

    let markup = '';

    if (editable) {
        let options = Object.keys(labels).map(
            (key) => 
            <option key={key} value={key}>{labels[key]}</option>
        );

        markup = 
            <select value={key} className="form-select-sm" aria-label="Select degree" onChange={onChange}>
                {options}
            </select>
    } else {
        let style = "url(/images/degrees/dan-" + key + ".gif)";

        markup = <span className="degree" style={{backgroundImage: style}}>{labels[key]}</span>
    }

    return (markup)
};