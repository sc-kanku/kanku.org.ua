import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';
import Degree from '../controls/Degree';
import Photo from '../controls/Photo';
import { EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

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

    // @Unused inline saving is used
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
            
            <form id="edit-athlete" className="row" method="post" action={updateUrl} encType="multipart/form-data">
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
                    
                    <EditableDate field="birthday" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.birthday} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <div> 
                    <label htmlFor="degree" className="form-label">Ступінь</label>
                    
                    <EditableDegree field="degree" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit && editedData.degree} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>
            </div>

            <div className="mb-3 col-sm-1 mb-3"></div>

            {/* TODO */}
            <div className="form-floating_ mb-3 col-sm-6">
                <label htmlFor="photo" className="form-label">Фото</label>
                
                <Photo id="photo" name="photo" className="form-control"
                    url={photoUrl}
                    alt={editHeader}
                    editable={true}
                />
            </div>

            <div className="col-md-5 d-grid gap-3 mb-3">
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
                    <label htmlFor="email" className="form-label">E-mail <span className='text-secondary' >(не можна редагувати)</span></label>
                    
                    <EditableText field="email" className="form-control"
                        id={isEdit && editedData.id} 
                        type="email" disabled={true}
                        initialValue={isEdit && editedData.email} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>
            </div>

            <div className="col-md-1"></div>

            <div className="col-md-6 mb-3">
                <p style={{'backgroundColor': 'yellow'}}>Клубна інформація</p>

                <EditableSwitch
                    field="is_actual" className="form-check-input"
                    id={isEdit ? editedData.id : 0} 
                    initialValue={(isEdit && editedData.is_actual) ? 1 : 0} 
                    inlineUpdateUrl='/api/athlete/update'
                >Належить до нашого клубу?
                </EditableSwitch>

                <EditableSwitch
                    field="show_in_blacks" className="form-check-input"
                    id={isEdit ? editedData.id : 0} 
                    initialValue={(isEdit && editedData.show_in_blacks) ? 1 : 0} 
                    inlineUpdateUrl='/api/athlete/update'
                >Показувати на сторінці чорних поясів нашого клубу (якщо досягнуто відповідного ступеню)?
                </EditableSwitch>
            </div>

            <div className="mb-3 col-md-12 d-grid gap-3">                
                <p style={{'backgroundColor': 'yellow'}}>Про спортсмена</p>
            
                <div>                
                    <label htmlFor="full" className="form-label">Повна інформація для сторінки спортсмена</label>
                    
                    <EditableTextarea field="full" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit ? editedData.full : ''} 
                        inlineUpdateUrl='/api/athlete/update'
                        rows='10'
                    />
                </div>

                <EditableSwitch
                    field="is_coach" className="form-check-input"
                    id={isEdit ? editedData.id : 0} 
                    initialValue={(isEdit && editedData.is_coach) ? 1 : 0} 
                    inlineUpdateUrl='/api/athlete/update'
                >Інструктор?
                </EditableSwitch>

                <div className="mb-2">                
                    <label htmlFor="brief" className="form-label">Коротка інформація для сторінки зі списком всіх інструкторів</label>

                    <EditableTextarea field="brief" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit ? editedData.brief : ''} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>

                <EditableSwitch
                    field="is_best" className="form-check-input"
                    id={isEdit ? editedData.id : 0} 
                    initialValue={(isEdit && editedData.is_best) ? 1 : 0} 
                    inlineUpdateUrl='/api/athlete/update'
                >Показувати в кращих спортсменах?
                </EditableSwitch>

                <div className="mb-2">                
                    <label htmlFor="briefBest" className="form-label">Коротка інформація для сторінки найкращих спортсменів</label>

                    <EditableTextarea field="briefBest" className="form-control"
                        id={isEdit && editedData.id} 
                        initialValue={isEdit ? editedData.briefBest : ''} 
                        inlineUpdateUrl='/api/athlete/update'
                    />
                </div>
            </div>

            <div className="mb-3 col-md-12">                
                <p style={{'backgroundColor': 'yellow'}}>Зали</p>
                <AthleteEditDojos 
                    athleteId={isEdit && editedData.id} 
                    dojos={dojos} 
                    updateUrl={updateUrl} 
                />
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
        
        <button type="submit" className="btn btn-success mb-3" onSubmit={saveAthlete}>Зберегти</button>
        */}
        
       </>
    )
};

export default EditAthlete;
