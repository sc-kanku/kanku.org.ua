import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';
import Degree from '../controls/Degree';
import Photo from '../controls/Photo';
import { EditableText } from '../controls/Table';

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
    let editHeader = isEdit  ?  "" + editedData.lastName + ' ' + editedData.firstName + ' ' + editedData.patronymic : "Ввести нового спортсмена";
    let editathleteHiddenInputId = isEdit && <input type="hidden" name="id" value={editedData.id} />
    let photoUrl = editedData && ("/images/athletes/" + editedData.id + "/photo.png");
    

    let coachChecked = isEdit && (editedData.is_coach == 1) 
        ? <input id="is_coach" className="form-check-input" type="checkbox" role="switch" name="is_coach" value="1" defaultChecked="checked" />
        : <input id="is_coach" className="form-check-input" type="checkbox" role="switch" name="is_coach" value="1"/>

    let actualChecked = isEdit && (editedData.is_actual == 1)
        ? <input id="is_actual" className="form-check-input" type="checkbox" role="switch" name="is_actual" value="1" defaultChecked="checked" />
        : <input id="is_actual" className="form-check-input" type="checkbox" role="switch" name="is_actual" value="1"/>

    let bestChecked = isEdit && (editedData.is_best == 1)
        ? <input id="is_best" className="form-check-input" type="checkbox" role="switch" name="is_best" value="1" defaultChecked="checked" />
        : <input id="is_best" className="form-check-input" type="checkbox" role="switch" name="is_best" value="1"/>

    let blackChecked = isEdit && (editedData.show_in_blacks == 1)
        ? <input id="show_in_blacks" className="form-check-input" type="checkbox" role="switch" name="show_in_blacks" value="1" defaultChecked="checked" />
        : <input id="show_in_blacks" className="form-check-input" type="checkbox" role="switch" name="show_in_blacks" value="1"/>


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
            
            <form id="edit-athlete" class="row" method="post" action={updateUrl} encType="multipart/form-data">
             {editathleteHiddenInputId}

             <div className="col-sm-5 d-grid gap-3">
                <div>
                    <label htmlFor="lastName" className="form-label">Прізвище</label>

                    <EditableText field="lastName" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.lastName} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>
                    <label htmlFor="firstName" className="form-label">Ім'я</label>

                    <EditableText field="firstName" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.firstName} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>
                    <label htmlFor="patronymic" className="form-label">По батькові</label>

                    <EditableText field="patronymic" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.patronymic} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>
                    <label htmlFor="birthday" className="form-label">Дата народження</label>
                    <input id="birthday" name="birthday" className="form-control"  
                        type="date"
                        placeholder="" 
                        defaultValue={isEdit && editedData.birthday}
                    />
                </div>

                <div> 
                    <label htmlFor="degree" className="form-label">Ступінь</label>
                    <Degree id="degree" name="degree" className="form-control"
                        value={isEdit && editedData.degree} 
                        editable={true}
                    />
                </div>
            </div>

            <div className="mb-3 col-sm-1 mb-3"></div>

            <div className="form-floating_ mb-3 col-sm-6">
                <label htmlFor="photo" className="form-label">Фото</label>
                <Photo id="photo" name="photo" className="form-control"
                    url={photoUrl}
                    alt={editHeader}
                    editable={true}
                />
            </div>

            <div class="col-md-5 d-grid gap-3 mb-3">
                <p style={{'backgroundColor': 'yellow'}}>Контактна інформація</p>
             
                <div>
                    <label htmlFor="phone" className="form-label">Телефон</label>
                    <EditableText field="phone" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.phone} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>
                    <label htmlFor="phone2" className="form-label">Додатковий телефон</label>
                    
                    <EditableText field="phone2" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.phone2} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>
                    <label htmlFor="email" className="form-label">E-mail</label>
                    
                    <EditableText field="email" className="form-control"
                        id={isEdit && editedData.id} 
                        type="email"
                        initialValue={isEdit && editedData.email} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>
            </div>

            <div className="col-md-1"></div>

            <div class="col-md-6 mb-3">
                <p style={{'backgroundColor': 'yellow'}}>Клубна інформація</p>

                <div className="form-check form-switch mb-3">
                    {actualChecked}
                    <label htmlFor="is_actual" className="form-label">Належить до нашого клубу?</label>
                </div>

                <div className="form-check form-switch mb-3">
                    {blackChecked}
                    <label htmlFor="show_in_blacks" className="form-label">Показувати на сторінці чорних поясів нашого клубу (якщо досягнуто відповідного ступеню)?</label>
                </div>
            </div>

            <div className="mb-3 col-md-12 d-grid gap-3">                
                <p style={{'backgroundColor': 'yellow'}}>Про спортсмена</p>
            
                <div>                
                    <label htmlFor="full" className="form-label">Повна інформація для сторінки спортсмена</label>
                    
                    <textarea id="full" name="full" className="form-control" rows="10"
                        defaultValue={full}
                    ></textarea>
                    
                </div>

                <div className="form-check form-switch">
                    {coachChecked}
                    <label htmlFor="is_coach" className="form-label">Інструктор?</label>
                </div>

                <div className="mb-2">                
                    <label htmlFor="brief" className="form-label">Коротка інформація для сторінки зі списком всіх інструкторів</label>

                    <textarea id="brief" name="brief" className="form-control" rows="5"
                        defaultValue={brief}
                    ></textarea>
                </div>

                <div className="form-check form-switch">
                    {bestChecked}
                    <label htmlFor="is_best" className="form-label">Показувати в кращих спортсменах?</label>
                </div>

                <div className="mb-2">                
                    <label htmlFor="briefBest" className="form-label">Коротка інформація для сторінки найкращих спортсменів</label>

                    <textarea id="briefBest" name="briefBest" className="form-control" rows="5"
                        defaultValue={briefBest}
                    ></textarea>
                </div>
            </div>

            <div className="mb-3 col-md-12">                
                <p style={{'backgroundColor': 'yellow'}}>Зали</p>
                <AthleteEditDojos dojos={dojos} updateUrl={updateUrl + '/' + id} />
            </div>

            <div className="mb-3 col-md-12 d-grid gap-3">                
                <p style={{'backgroundColor': 'yellow'}}>Соціальні мережі</p>
                
                <div>                
                    <label htmlFor="facebook" className="form-label">Facebook</label>

                    <EditableText field="facebook" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.facebook} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>                
                    <label htmlFor="instagram" className="form-label">Instagram</label>
                    
                    <EditableText field="instagram" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.instagram} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>                
                    <label htmlFor="youtube" className="form-label">Youtube</label>

                    <EditableText field="youtube" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.youtube} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div>                
                    <label htmlFor="twitter" className="form-label">Twitter</label>

                    <EditableText field="twitter" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.twitter} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>
            </div>
        </form>
        {/*


        <tr>
            <td>VK</td>
            <td> <input type="text" name="vk" size="50" defaultValue={isEdit && editedData.vk} /></td>
        </tr>
        

        <tr>
            <td>LiveJournal</td>
            <td> <input type="text" name="lj" size="50" defaultValue={isEdit && editedData.lj} /> </td>
        </tr>
        <tr>
            <td>Одноклассники</td>
            <td><input type="text" name="ok" size="50" defaultValue={isEdit && editedData.ok} /></td>
        </tr>
        
        <button type="submit" class="btn btn-success mb-3" onSubmit={saveAthlete}>Зберегти</button>
        */}
        
       </>
    )
};

export default EditAthlete;
