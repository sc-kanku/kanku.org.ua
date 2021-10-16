import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';
import Degree from '../controls/Degree';
import AthleteEditDojos from '../controls/AthleteEditDojos';

const EditAthlete = ({getUrl, updateUrl, photoFileName}) => {
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

    const saveAthlete = (e) => {
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
    let editHeader = isEdit  ?  "Відредагувати " + editedData.lastName + ' ' + editedData.firstName + ' ' + editedData.patronymic : "Ввести нового спортсмена";
    let editathleteHiddenInputId = isEdit && <input type="hidden" name="id" value={editedData.id} />
    let photoUrl = editedData && ("/images/athletes/" + editedData.id + "/photo.png");
    let degree = isEdit && <Degree value={editedData.degree} editable={true}/>;

    let coachChecked = isEdit && (editedData.is_coach == 1) 
        ? <input type="checkbox" name="is_best" value="1" defaultChecked="checked" />
        : <input type="checkbox" name="is_best" value="1"/>

    let actualChecked = isEdit && (editedData.is_actual == 1)
        ? <input type="checkbox" name="is_actual" value="1"defaultChecked="checked" />
        : <input type="checkbox" name="is_actual" value="1"/>


    let bestChecked = isEdit && (editedData.is_best == 1)
        ? <input type="checkbox" name="is_best" value="1"defaultChecked="checked" />
        : <input type="checkbox" name="is_best" value="1"/>

    let blackChecked = isEdit && (editedData.show_in_blacks == 1)
        ? <input type="checkbox" name="show_in_blacks" value="1"defaultChecked="checked" />
        : <input type="checkbox" name="show_in_blacks" value="1"/>


    let full = isEdit ? editedData.full : '';
    let brief = isEdit ? editedData.brief : '';
    let briefBest = isEdit ? editedData.briefBest : '';
    let dojos = isEdit ? editedData.dojos : null;

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
        return (<Redirect to='/admin/athlete/list' />);
    }

    return (
        <>
            <h2>{editHeader}</h2>

            <form id="edit-athlete" method="post" action={updateUrl} encType="multipart/form-data">
             {editathleteHiddenInputId}

                <table className="usual" cellSpacing="0">
                    <tbody>
                    <tr>
                        <td>Прізвище</td>
                        <td> <input type="text" name="lastName" size="50" defaultValue={isEdit && editedData.lastName} /> </td>
                    </tr>
                    <tr>
                        <td>Ім'я</td>
                        <td><input type="text" name="firstName" size="20" defaultValue={isEdit && editedData.firstName} /> </td>
                    </tr>
                    <tr>
                        <td>По батькові</td>
                        <td><input type="text" name="patronymic" size="30" defaultValue={isEdit && editedData.patronymic} /></td>
                    </tr>
                    
                    <tr>
                        <td>День народження</td>
                        <td>{isEdit && editedData.birthday}</td>
                    </tr>
                    <tr>
                        <td>Ступінь</td>
                        <td>{degree}</td>
                    </tr>
                    <tr>
                        <td>Фото</td>
                        <td>
                            <div className="col-2" style={{width:'10%'}}>
                                <img className="instructor-photo" src={photoUrl} alt={editHeader} />
                            </div>
                            <br/>Змінити
                            <br/><input type="file" name="photo" />
                            <br/>Співвідношення висоти до ширини фото<br />має бути 3:2
                        </td>
                    </tr>

                    <tr  style={{'backgroundColor': 'yellow'}}>
                        <td colSpan="2">Клубна інформація</td>
                    </tr>

                    <tr>
                        <td style={{textAlign:'right'}}>{actualChecked}</td>
                        <td>Належить до нашого клубу?</td>
                    </tr>

                    <tr>
                        <td style={{textAlign:'right'}}>{coachChecked}</td>
                        <td>Інструктор?</td>
                    </tr>

                    <tr>
                        <td style={{textAlign:'right'}}>{bestChecked}</td>
                        <td>Показувати в кращих спортсменах?</td>
                    </tr>

                    <tr>
                        <td style={{textAlign:'right'}}>{blackChecked}</td>
                        <td>Показувати на сторінці чорних поясів нашого клубу<br />(якщо досягнуто відповідного ступеню)?</td>
                    </tr>
                    <tr>
                        <td>Повна інформація</td>
                        <td><textarea name="full" rows="10" cols="50" defaultValue={full}></textarea> </td>
                    </tr>
                    <tr>
                        <td>Коротка інформація для сторінки зі списком всіх інструкторів</td>
                        <td> <textarea name="brief" rows="5" cols="50" defaultValue={brief}></textarea> </td>
                    </tr>
                    <tr>
                        <td>Коротка інформація для сторінки найкращих спортсменів</td>
                        <td> <textarea name="briefBest" rows="5" cols="50" defaultValue={briefBest}></textarea> </td>
                    </tr>

                    <tr>                    
                        <td>Зали</td>
                        <td><AthleteEditDojos dojos={dojos} updateUrl={updateUrl + '/' + id} /></td>
                    </tr>
{/* 
                    <tr>
                        <td>Фотогалерея</td>
                        <td>{garrerySnippet}</td>
                    </tr>
*/}

        <tr  style={{'backgroundColor': 'yellow'}}>
            <td colSpan="2">Контактна інформація</td>
        </tr>

        <tr>
            <td>Телефон</td>
            <td> <input type="text" name="phone" size="25" defaultValue={isEdit && editedData.phone} /> </td>
        </tr>

        <tr>
            <td>Телефон 2</td>
            <td> <input type="text" name="phone2" size="25" defaultValue={isEdit && editedData.phone2 } /> </td>
        </tr>
        <tr>
            <td>E-mail</td>
            <td> <input type="text" name="email" size="50" defaultValue={isEdit && editedData.email} /> </td>
        </tr>

        <tr  style={{'backgroundColor': 'yellow'}}>
            <td colSpan="2">Соціальні мережі</td>
        </tr>

        <tr>
            <td>Facebook </td>
            <td> <input type="text" name="facebook" size="50" defaultValue={isEdit && editedData.facebook} /> </td>
        </tr>

        <tr>
            <td>Instagram</td>
            <td> <input type="text" name="instagram" size="50" defaultValue={isEdit && editedData.instagram} /> </td>
        </tr>

        <tr>
            <td>Youtube</td>
            <td> <input type="text" name="youtube" size="50" defaultValue={isEdit && editedData.youtube} /></td>
        </tr>

        <tr>
            <td>Twitter</td>
            <td> <input type="text" name="twitter" size="50" defaultValue={isEdit && editedData.twitter} /> </td>
        </tr>

        {/*
        <tr>
            <td>VK</td>
            <td> <input type="text" name="vk" size="50" defaultValue={isEdit && editedData.vk} /></td>
        </tr>
        */}

        <tr>
            <td>LiveJournal</td>
            <td> <input type="text" name="lj" size="50" defaultValue={isEdit && editedData.lj} /> </td>
        </tr>
        <tr>
            <td>Одноклассники</td>
            <td><input type="text" name="ok" size="50" defaultValue={isEdit && editedData.ok} /></td>
        </tr>
        
        

        <tr>
            <td colSpan="2">
                <input type="button" name="save" value="зберегти" onClick={saveAthlete} />
            </td>
        </tr>
                    </tbody>
                </table>
            </form>
        </>
    )
};

export default EditAthlete;
