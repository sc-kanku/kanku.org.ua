import React, {useMemo, useState, useEffect} from 'react';
import { useParams, useLocation, Redirect} from 'react-router-dom';
import EditAttachedEntities from '../controls/EditAttachedEntities';
import Photo from '../controls/Photo';
import EditDojoCoordinates from './EditDojoCoordinates';

import { EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

const EditDojo = ({getUrl, updateUrl, photoFileName}) => {
    let { id } = useParams();
    const location = useLocation();
    const [dojo, setDojo] = useState({});

    let isNew = location.pathname.indexOf('new') !== -1;
    let isEdit = !isNew;

    useEffect(() => {
        if (isEdit) {
            fetch(getUrl + "/" + id)
                .then( response => response.json() )
                .then( setDojo )
        } else if (isNew) {
            // console.log('setting up new dojo');

            setDojo({
                name: '',
                is_actual: 0,
                info: '',
                athletes: [],
                place: 1,
                district: '',
                address: '',
                coords: ''
            })
        }
    }, [location.key]);

    // let isEdit = id != null;

    let garrerySnippet = "";

    if (isEdit && dojo.gallery) {
        let galleryUrl = "photo.php?galleryID=" + dojo.gallery['galleryID'];
        garrerySnippet =
                    <ol><li><a href={galleryUrl}>{dojo.gallery['name']}</a></li></ol>
    } else {
        if (isEdit) {
            garrerySnippet =
            <p>
                Фотогалерея еще не введена<br />
                <input type="button" value="Ввести фотогалерею" onclick="location.href='new_a_gallery.php?id=<?= $athlet->id ?>'" />
            </p>
        } else {
            garrerySnippet = <p>Фотогалерею Ви зможете ввести після першого збереження спортсмена</p>
        }
    }

    let saveCallback = (data) => {
        // console.log('data', data);

        let response = data.response;
        if (response && typeof (response.id) !== 'undefined') {
            dojo.id = response.id;
        }

        // console.log('athlete after callback', athlete);
    }

    let getId = () => {
        return dojo.id;
    }

    return (
        <>
            <h2>{ isEdit ? dojo.name : "Створити новий доджо" }</h2>

            <form encType="multipart/form-data" className="row">
                <div className="col-sm-5 d-grid gap-3">
                    <div>
                        <label htmlFor="lastName" className="form-label">Назва</label>

                        <EditableText field="name" className="form-control"
                            // id={getId}
                            getId={getId}
                            initialValue={dojo.name}
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <EditableSwitch
                        field="is_actual" className="form-check-input"
                        // id = { getId }
                        getId = { getId }
                        initialValue = { dojo.is_actual }
                        inlineUpdateUrl = { updateUrl }
                        onBeforeSuccess={saveCallback}
                    >Чи актуальний зал (чи проводяться в ньому заняття?)
                    </EditableSwitch>

                    <div>
                        <label htmlFor="info" className="form-label">Інформація</label>

                        <EditableTextarea field="info" className="form-control"
                            // id={getId}
                            getId = { getId }
                            initialValue={ dojo.info }
                            inlineUpdateUrl={updateUrl}
                            rows='10'
                            onBeforeSuccess={saveCallback}
                        />
                    </div>
                </div>

                <div className="mb-3 col-sm-1 mb-3"></div>

                {/* TODO */}
                <div className="form-floating_ mb-3 col-sm-6">
                    <label htmlFor="photo" className="form-label">Фото</label>

                    <Photo id="photo" name="photo" className="form-control"
                        url={dojo && ("/images/dojos/" + dojo.id + "/photo.png")}
                        alt={isEdit ? ('' + dojo.name) : "Фото доджо"}
                        editable={true}
                    />
                    Буде автоматично створено preview с шириною 300px
                </div>


                <div className="col-md-12 mb-3">
                    <p style={{'backgroundColor': 'yellow'}}>Інструктори</p>
                    <EditAttachedEntities
                        entityName='dojo'
                        // entityId={ getId }
                        getId={ getId }
                        entityNameToAttach='athlete'
                        attachedEntities={ dojo.athletes }
                        updateUrl={updateUrl}
                        onBeforeSuccess={saveCallback}
                    />
                </div>

                <p className="col-md-12 d-grid mb-3" style={{'backgroundColor': 'yellow'}}>Локація</p>

                <div className="col-md-2 mb-3">
                    <label htmlFor="place" className="form-label">Розташування</label>

                    <EditableSwitch
                        field="place" className="form-check-input"
                        // id={ getId }
                        getId={ getId }
                        initialValue={ dojo.place }
                        inlineUpdateUrl={updateUrl}
                        values = { [1, 2] }
                        labels = { ['Львів', 'Область']}
                        onBeforeSuccess={saveCallback}
                    />
                </div>

                <div className="col-md-10 mb-3">
                    <label htmlFor="district" className="form-label">Район</label>

                    <EditableText field="district" className="form-control"
                        // id={ getId }
                        getId={ getId }
                        initialValue={ dojo.district }
                        inlineUpdateUrl={updateUrl}
                        onBeforeSuccess={saveCallback}
                    />
                </div>

                {/* <div className="col-md-6 mb-3">
                    <label htmlFor="point" className="form-label">point</label>

                    <EditableText field="point" className="form-control"
                        id={ id }
                        initialValue={isEdit && dojo.point}
                        inlineUpdateUrl={updateUrl}
                    />
                </div> */}

                <div className="col-md-12 d-grid gap-3 mb-3">
                    <div>
                        <label htmlFor="address" className="form-label">Адреса (без зазначення України і Львова/Львівськой області)</label>

                        <EditableText field="address" className="form-control"
                            // id={ getId }
                            getId={ getId }
                            initialValue={ dojo.address }
                            inlineUpdateUrl={ updateUrl }
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <EditDojoCoordinates dojo={dojo} updateUrl={updateUrl} />
                    </div>
                </div>

                    {/*}
                    <tr>
                        <td>url</td>
                        <td><input type="text" name="url" size="30" defaultValue={isEdit && dojo.url} /></td>
                    </tr>
                    */}

{/*
                    <tr>
                        <td>Фотогалерея</td>
                        <td>{garrerySnippet}</td>
                    </tr>
*/}


                    {/* <tr>
                        <td colSpan="2">
                            <input type="button" name="save" value="зберегти" onClick={saveEntity} />
                        </td>
                    </tr> */}

            </form>
        </>
    )
};

export default EditDojo;
