import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';
import DojoEditAthletes from '../controls/DojoEditAthletes';

const EditDojo = ({getUrl, updateUrl, photoFileName}) => {
    let { id } = useParams();
    const [editedData, setEditedData] = useState(null);
    const [isSavingDone, setIsSavingDone] = useState(false);

    useEffect(() => {
        fetch(getUrl + "/" + id)
            .then(response => response.json())
            .then( editedData => {
                setEditedData(editedData);
            })
    }, []);

    const saveEntity = (e) => {
        const formData = new FormData( document.getElementById('edit-athlete') );

        fetch(updateUrl + "/" + id, {
            method: 'POST',
            body: formData
        })
        .then(response => response/*.json()*/)
        .then( response => {
            setIsSavingDone(true);
            // synch
            // setEditedData(editedData);
        });
    }

    let isEdit = editedData && editedData.id != null;
    let editHeader = isEdit  ?  "Відредагувати " + editedData.name : "Ввести нового спортсмена";
    let editEntityHiddenInputId = isEdit && <input type="hidden" name="id" value={editedData.id} />
    let photoUrl = editedData && ("/images/dojos/" + editedData.id + "/photo.jpg");

    let place = editedData && editedData.place == 1 
        ? <>
            <input type="radio" name="place" value="1" defaultChecked="checked" /> Львів
            <input type="radio" name="place" value="2" /> Область
        </>
        : editedData && editedData.place == 2 
            ? <>
            <input type="radio" name="place" value="1" /> Львів
            <input type="radio" name="place" value="2" defaultChecked="checked" /> Область
        </>
            : null;
    
    let actualChecked = isEdit && (editedData.is_actual == 1)
        ? <input type="checkbox" name="is_actual" value="1" defaultChecked="checked" />
        : <input type="checkbox" name="is_actual" value="1"/>

    let manualChecked = isEdit && (editedData.is_manual == 1)
        ? <input type="checkbox" name="is_manual" value="1" defaultChecked="checked" />
        : <input type="checkbox" name="is_manual" value="1"/>

    let full = isEdit ? editedData.info : '';
    let athletes = isEdit ? editedData.athletes : null;

    let garrerySnippet = "";
    
    if (isEdit && editedData.gallery) {
        let galleryUrl = "photo.php?galleryID=" + editedData.gallery['galleryID'];
        garrerySnippet = 
                    <ol><li><a href={galleryUrl}>{editedData.gallery['name']}</a></li></ol>
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

    if (isSavingDone) {
        return (<Redirect to='/admin/dojo/list' />);
    }

    return (
        <>
            <h2>{editHeader}</h2>

            <form id="edit-dojo" method="post" action={updateUrl} encType="multipart/form-data">
                {editEntityHiddenInputId}

                <table className="usual" cellSpacing="0">
                    <tbody>
                    <tr>
                        <td>Назва</td>
                        <td> <input type="text" name="name" size="50" defaultValue={isEdit && editedData.name} /> </td>
                    </tr>

                    <tr>
                        <td>Інформація</td>
                        <td><textarea name="full" rows="10" cols="50" defaultValue={full}></textarea> </td>
                    </tr>

                    <tr>
                        <td style={{textAlign:'right'}}>{actualChecked}</td>
                        <td>Чи актуальний зал <br /> (чи проводяться в ньому заняття?)</td>
                    </tr>

                    <tr>                    
                        <td>Інструктори</td>
                        <td><DojoEditAthletes athletes={athletes} updateUrl={updateUrl + '/' + id} /></td>
                    </tr>

                    <tr>
                        <td>
                            Фото
                        </td>
                        <td>
                            <div className="col-2" style={{width:'10%'}}>
                                <img className="dojo-photo instructor-photo" src={photoUrl} alt={editHeader} />
                            </div>
                            <br/>Змінити
                            <br/><input type="file" name="photo" />
                            <br/>Буде автоматично створено preview с шириною 300px
                        </td>
                    </tr>

                    <tr  style={{'backgroundColor': 'yellow'}}>
                        <td colSpan="2">Локація</td>
                    </tr>

                    <tr>
                        <td>Розташування</td>
                        <td>{place}</td>
                    </tr>

                    <tr>
                        <td>Район</td>
                        <td><input type="text" name="district" size="30" defaultValue={isEdit && editedData.district} /></td>
                    </tr>

                    <tr>
                        <td>point</td>
                        <td><input type="text" name="point" size="20" defaultValue={isEdit && editedData.point} /> </td>
                    </tr>

                    <tr>
                        <td>Адреса<br />(без зазначення України<br />і Львова/Львівськой області)</td>
                        <td><input type="text" name="address" size="30" defaultValue={isEdit && editedData.address} /></td>
                    </tr>

                    <tr>
                        <td>Координаты на Гугл-мапі</td>
                        <td><input type="text" name="coords" size="30" defaultValue={isEdit && editedData.coords} /></td>
                    </tr>
                    
                    <tr> 
                        <td style={{textAlign:'right'}}>{manualChecked}</td>
                        <td><b>Вручну встановлені координати?</b> <br />в цьому випадку вони не будуть<br />перераховуватися автоматично</td>
                    </tr>

                    {/*}
                    <tr>
                        <td>url</td>
                        <td><input type="text" name="url" size="30" defaultValue={isEdit && editedData.url} /></td>
                    </tr>
                    */}

{/* 
                    <tr>
                        <td>Фотогалерея</td>
                        <td>{garrerySnippet}</td>
                    </tr>
*/}


                    <tr>
                        <td colSpan="2">
                            <input type="button" name="save" value="зберегти" onClick={saveEntity} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
};

export default EditDojo;
