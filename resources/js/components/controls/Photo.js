import {React, useState} from 'react';
import useEditable from '../utils/useEditable';

const Photo = ({initialValue, className,  ...props }) => {
    initialValue = initialValue != null ? initialValue : '';
    className = typeof className == 'undefined' ? '' : className;
    let imgBytes = null;
    const [url, setUrl] = useState(initialValue);
    const [photoBytes, setPhotoBytes] = useState(null);
    // const [photoName, setPhotoName] = useState('');
    const [extensions, setExtensions] = useState(['png', 'jpeg', 'jpg', 'gif', 'svg']);

    async function onPhotoChange(evnt) {
        const FILE_MAX_SIZE = 1000000;
        let file = evnt.target.files[0];

        if (file.size < FILE_MAX_SIZE) {
            imgBytes = await getBase64(file);

            setPhotoBytes(imgBytes); ////.replace(/^data:(.*,)?/, '');
            // console.log("imgBytes", imgBytes)
            // setPhotoName(file['name']);

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

    const defineExtension = (str) => {
        return str.substring(str.lastIndexOf('.') + 1, str.length);
    }

    const defineBase = (str) => {
        return str.substring(0, str.lastIndexOf('.'));
    }

    const adjustExtension = (e) => {
        let ext = defineExtension(e.target.src);
        let base = defineBase(e.target.src);
        let filtered = extensions.filter(el => el != ext);

        setExtensions(filtered);
        setUrl(filtered.length > 0 ? (base + '.' + filtered[0]) : null);
    }

    return (<>
        <Editable />
        <p>
            <span style={{
                borderWidth: '1px',
                borderColor: '#aaa',
                borderStyle:  'solid',
                width: '14em',
                height: '14em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#aaa',
                // display: 'inline-block'
            }}>

            {!photoBytes && !url && <span>No Picture</span>}
            {!photoBytes && url && <img src={url} style={{height:'100%'}} onError={adjustExtension} />}
            {photoBytes && <img src={photoBytes} style={{height:'100%'}} />}

            </span>
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
