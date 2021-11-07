import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';
import Photo from '../controls/Photo';
import { EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

import AthleteEditDojos from '../controls/AthleteEditDojos';

const EditAthlete = ({getUrl, updateUrl, photoFileName}) => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState({});

    useEffect(() => {
        fetch(getUrl + "/" + id)
            .then(response => response.json())
            .then(setAthlete)
    }, []);

    let isEdit = id != null;

    // TODO: 
    let garrerySnippet = "";

    if (isEdit && athlete.gallery) {
        let galleryUrl = "photo.php?galleryID=" + athlete.gallery['galleryID'];
        garrerySnippet = 
                    <ol><li><a href={galleryUrl}>{athlete.gallery['name']}</a></li></ol>
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

    return (<>
            <h2>{isEdit ? ('' + athlete.lastName + ' ' + athlete.firstName + ' ' + athlete.patronymic ) : "Створити нового спортсмена"}</h2>

            <form className="row" encType="multipart/form-data">
                <div className="col-sm-5 d-grid gap-3">
                    <div>
                        <label htmlFor="lastName" className="form-label">Прізвище</label>

                        <EditableText field="lastName" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.lastName} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName" className="form-label">Ім'я</label>

                        <EditableText field="firstName" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.firstName} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="patronymic" className="form-label">По батькові</label>

                        <EditableText field="patronymic" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.patronymic} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="birthday" className="form-label">Дата народження</label>
                        
                        <EditableDate field="birthday" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.birthday} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div> 
                        <label htmlFor="degree" className="form-label">Ступінь</label>
                        
                        <EditableDegree field="degree" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.degree} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>
                </div>

                <div className="mb-3 col-sm-1 mb-3"></div>

                {/* TODO */}
                <div className="form-floating_ mb-3 col-sm-6">
                    <label htmlFor="photo" className="form-label">Фото</label>
                    
                    <Photo id="photo" name="photo" className="form-control"
                        url={athlete && ("/images/athletes/" + athlete.id + "/photo.png")}
                        alt={isEdit ? ('' + athlete.lastName + ' ' + athlete.firstName + ' ' + athlete.patronymic ) : "Фото спортсмена"}
                        editable={true}
                    />
                </div>

                <div className="col-md-5 d-grid gap-3 mb-3">
                    <p style={{'backgroundColor': 'yellow'}}>Контактна інформація</p>
                
                    <div>
                        <label htmlFor="phone" className="form-label">Телефон</label>
                        
                        <EditableText field="phone" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.phone} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone2" className="form-label">Додатковий телефон</label>
                        
                        <EditableText field="phone2" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.phone2} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">E-mail <span className='text-secondary' >(не можна редагувати)</span></label>
                        
                        <EditableText field="email" className="form-control"
                            id={isEdit && athlete.id} 
                            type="email" disabled={true}
                            initialValue={isEdit && athlete.email} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>
                </div>

                <div className="col-md-1"></div>

                <div className="col-md-6 mb-3">
                    <p style={{'backgroundColor': 'yellow'}}>Клубна інформація</p>

                    <EditableSwitch
                        field="is_actual" className="form-check-input"
                        id={isEdit ? athlete.id : 0} 
                        initialValue={(isEdit && athlete.is_actual) ? 1 : 0} 
                        inlineUpdateUrl={updateUrl}
                    >Належить до нашого клубу?
                    </EditableSwitch>

                    <EditableSwitch
                        field="show_in_blacks" className="form-check-input"
                        id={isEdit ? athlete.id : 0} 
                        initialValue={(isEdit && athlete.show_in_blacks) ? 1 : 0} 
                        inlineUpdateUrl={updateUrl}
                    >Показувати на сторінці чорних поясів нашого клубу (якщо досягнуто відповідного ступеню)?
                    </EditableSwitch>
                </div>

                <div className="mb-3 col-md-12 d-grid gap-3">                
                    <p style={{'backgroundColor': 'yellow'}}>Про спортсмена</p>
                
                    <div>                
                        <label htmlFor="full" className="form-label">Повна інформація для сторінки спортсмена</label>
                        
                        <EditableTextarea field="full" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit ? athlete.full : ''} 
                            inlineUpdateUrl={updateUrl}
                            rows='10'
                        />
                    </div>

                    <EditableSwitch
                        field="is_coach" className="form-check-input"
                        id={isEdit ? athlete.id : 0} 
                        initialValue={(isEdit && athlete.is_coach) ? 1 : 0} 
                        inlineUpdateUrl={updateUrl}
                    >Інструктор?
                    </EditableSwitch>

                    <div className="mb-2">                
                        <label htmlFor="brief" className="form-label">Коротка інформація для сторінки зі списком всіх інструкторів</label>

                        <EditableTextarea field="brief" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit ? athlete.brief : ''} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <EditableSwitch
                        field="is_best" className="form-check-input"
                        id={isEdit ? athlete.id : 0} 
                        initialValue={(isEdit && athlete.is_best) ? 1 : 0} 
                        inlineUpdateUrl={updateUrl}
                    >Показувати в кращих спортсменах?
                    </EditableSwitch>

                    <div className="mb-2">                
                        <label htmlFor="briefBest" className="form-label">Коротка інформація для сторінки найкращих спортсменів</label>

                        <EditableTextarea field="briefBest" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit ? athlete.briefBest : ''} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>
                </div>

                <div className="mb-3 col-md-12">                
                    <p style={{'backgroundColor': 'yellow'}}>Зали</p>
                    <AthleteEditDojos 
                        athleteId={isEdit && athlete.id} 
                        dojos={isEdit ? athlete.dojos : null} 
                        updateUrl={updateUrl} 
                    />
                </div>

                <div className="mb-3 col-md-12 d-grid gap-3">                
                    <p style={{'backgroundColor': 'yellow'}}>Соціальні мережі</p>
                    
                    <div>                
                        <label htmlFor="facebook" className="form-label">Facebook</label>

                        <EditableText field="facebook" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.facebook} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>                
                        <label htmlFor="instagram" className="form-label">Instagram</label>
                        
                        <EditableText field="instagram" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.instagram} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>                
                        <label htmlFor="youtube" className="form-label">Youtube</label>

                        <EditableText field="youtube" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.youtube} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>

                    <div>                
                        <label htmlFor="twitter" className="form-label">Twitter</label>

                        <EditableText field="twitter" className="form-control"
                            id={isEdit && athlete.id} 
                            initialValue={isEdit && athlete.twitter} 
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>
                </div>
            </form>        
        </>
    );
};

export default EditAthlete;
