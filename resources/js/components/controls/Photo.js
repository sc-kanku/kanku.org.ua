import {React, useState} from 'react';
import useEditable from '../utils/useEditable';

const Photo = ({initialValue, className,  ...props }) => {
    initialValue = initialValue != null ? initialValue : '';
    className = typeof className == 'undefined' ? '' : className;
    let imgBytes = null;
    const [url, setUrl] = useState(initialValue);
    const [photoBytes, setPhotoBytes] = useState(null);
    const [photoName, setPhotoName] = useState('');

    async function onPhotoChange(evnt) {
        const FILE_MAX_SIZE = 100000;
        let file = evnt.target.files[0];

        if (file.size < FILE_MAX_SIZE) {
            imgBytes = await getBase64(file);

            setPhotoBytes(imgBytes); ////.replace(/^data:(.*,)?/, '');
            // console.log("imgBytes", imgBytes)
            setPhotoName(file['name']);

            return true;
        } else {
            alert("Завеликий, має бути до 100kb");

            return false;
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const [Editable, value, onChange, setValue] = useEditable({
        ...props,
        data: {
            id: props.id ? props.id : props.getId ? props.getId : null,
            field: props.field,
            value: ''
        },
        // getNewValue : (e) => e.target.files[0]['name'],
        getNewValue : (e) => {
            // why photoBytes is always null here??? Used imgBytes as a workaround.
            return (photoBytes || imgBytes || '');///.replace(/^data:(.*,)?/, '');
        },
        onBeforeSave: onPhotoChange
    });

    return (<>
        <Editable />
        <p>
            {!photoBytes && url && <img src={url} style={{width:'180px'}} />}
            {photoBytes && <img src={photoBytes} style={{width:'180px'}} />}
        </p>

        <div className="mt-3">
            <label htmlFor={props.field} className="custom-file-upload btn-sm btn-outline-success">Змінити</label>
            <input
                id={props.field} name={props.field} className={className}
                type='file'
                onChange={onChange}
            />
        </div>

        <p>Співвідношення висоти до ширини фото має бути 3:2</p>
    </>)
};

export default Photo;
