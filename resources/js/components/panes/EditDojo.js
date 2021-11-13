import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';
import EditAttachedEntities from '../controls/EditAttachedEntities';
import Photo from '../controls/Photo';
import EditDojoCoordinates from './EditDojoCoordinates';

import { EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

const EditDojo = ({getUrl, updateUrl, photoFileName}) => {
    let { id } = useParams();
    const [dojo, setDojo] = useState({});

    useEffect(() => {
        fetch(getUrl + "/" + id)
            .then( response => response.json() )
            .then( setDojo )
    }, [id]);

    let isEdit = id != null;

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

    return (
        <>
            <h2>{ isEdit ? dojo.name : "Новий доджо" }</h2>

            <form encType="multipart/form-data" className="row">
                <div className="col-sm-5 d-grid gap-3">
                    <div>
                        <label htmlFor="lastName" className="form-label">Назва</label>

                        <EditableText field="name" className="form-control"
                            id={id}
                            initialValue={isEdit && dojo.name}
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <EditableSwitch
                        field="is_actual" className="form-check-input"
                        id={ id }
                        initialValue={(isEdit && dojo.is_actual) ? 1 : 0}
                        inlineUpdateUrl={updateUrl}
                    >Чи актуальний зал (чи проводяться в ньому заняття?)
                    </EditableSwitch>

                    <div>
                        <label htmlFor="info" className="form-label">Інформація</label>

                        <EditableTextarea field="info" className="form-control"
                            id={id}
                            initialValue={isEdit ? dojo.info : ''}
                            inlineUpdateUrl={updateUrl}
                            rows='10'
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
                        entityId={ id}
                        entityNameToAttach='athlete'
                        attachedEntities={isEdit ? dojo.athletes : null}
                        updateUrl={updateUrl}
                    />
                </div>

                <p className="col-md-12 d-grid mb-3" style={{'backgroundColor': 'yellow'}}>Локація</p>

                <div className="col-md-2 mb-3">
                    <label htmlFor="place" className="form-label">Розташування</label>

                    <EditableSwitch
                        field="place" className="form-check-input"
                        id={ id }
                        initialValue={ isEdit ? dojo.place : 1 }
                        inlineUpdateUrl={updateUrl}
                        values = { [1, 2] }
                        labels = { ['Львів', 'Область']}
                    />
                </div>

                <div className="col-md-10 mb-3">
                    <label htmlFor="district" className="form-label">Район</label>

                    <EditableText field="district" className="form-control"
                        id={id}
                        initialValue={isEdit && dojo.district}
                        inlineUpdateUrl={updateUrl}
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
                            id={ id }
                            initialValue={ isEdit && dojo.address }
                            inlineUpdateUrl={ updateUrl }
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
