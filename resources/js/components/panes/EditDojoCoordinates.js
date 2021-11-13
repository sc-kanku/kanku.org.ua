import React, {useMemo, useState, useEffect} from 'react';
import { EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

// TODO: bugfix
const EditDojoCoordinates = ({ dojo, updateUrl }) => {
    const [automaticGeocode, setAutomaticGeocode] = useState('');
    const [dojoModel, setDojoModel] = useState(dojo);

    useEffect(() => {
        setDojoModel(dojo)
    } );

    let isEdit = typeof dojo != 'undefined';

    const getAddress = () => {
        return 'Україна, м. Львів, пр Чорновола, буд. 103, кв. 75';
    }

    const geocode = (isAutomatic) => {
        dojoModel.is_manual = !isAutomatic;
        dojoModel.coords = automaticGeocode;

        setDojoModel({ ...dojoModel })

        if (isAutomatic && typeof getAddress == 'function') {
            try {
                let gc = new google.maps.Geocoder();

                gc.geocode({
                    address: getAddress()
                }, (results, status) => {
                    console.log(results);
                    let coords = results[0].geometry.location.lat() + ', ' + results[0].geometry.location.lng();

                    console.log( coords );

                    setAutomaticGeocode(coords);
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    // geocode callback
    window.geocode = () => {
        geocode( isEdit && !dojoModel.is_manual);
    }

    console.log( dojoModel);

    return (<>

        <label htmlFor="coords" className="form-label">Координаты на Гугл-мапі</label>

        <EditableSwitch
            field="is_manual" className="form-check-input"
            id={ isEdit && dojoModel.id }
            initialValue={ isEdit && dojoModel.is_manual }
            values={ [1, 0] }
            inlineUpdateUrl={ updateUrl }
            onChange={ geocode }
        >автоматично розраховувати координати { (isEdit && (dojoModel.is_manual || automaticGeocode == '')) ? '' : '(' + automaticGeocode + ')' }
        </EditableSwitch>

        <EditableText field="coords" className="form-control"
            id={ isEdit && dojoModel.id }
            initialValue={ isEdit && (dojoModel.is_manual ? dojoModel.coords : automaticGeocode) }
            inlineUpdateUrl={ updateUrl }
            disabled={ isEdit && !dojoModel.is_manual }
            onChange={ value => dojoModel.coords = value }
            // updateOnStart={ isEdit && !dojoModel.is_manual && (dojoModel.coords != automaticGeocode) && (automaticGeocode != '') && ((dojoModel.coords = automaticGeocode && setDojoModel({ ...dojoModel })) ? true : true) }
        />
    </>
    )

}

export default EditDojoCoordinates;
