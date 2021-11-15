import React, {useMemo, useState, useEffect} from 'react';
import { useParams, useLocation} from 'react-router-dom';
import Photo from '../controls/Photo';
import { EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

import EditAttachedEntities from '../controls/EditAttachedEntities';

const EditAthlete = ({getUrl, updateUrl}) => {
    const { id } = useParams();
    const location = useLocation();
    const [athlete, setAthlete] = useState({});

    let isNew = location.pathname.indexOf('new') !== -1;
    let isEdit = !isNew;

    useEffect(() => {
        if (isEdit) {
            fetch( getUrl + "/" + id )
                .then( response => response.json() )
                .then( setAthlete )
        } else if (isNew) {
            console.log('setting up new athlete');

            setAthlete({
                is_coach: 1,
                is_actual: 1,
                is_best: 0,
                show_in_blacks: 0,
                firstName:'',
                lastName:'',
                patronymic:'',
                degree:1,
                birthday:"2000-01-01",
                brief:'',
                briefBest:'',
                full:'',
                phone:'',
                phone2:'',
                email:'',
                twitter:'',
                facebook:'',
                youtube:'',
                instagram:'',
                dojos: []
            })
        }
    }, [location.key]);

    // TODO:
    let gallerySnippet = "";

    if (athlete.gallery) {
        let galleryUrl = "photo.php?galleryID=" + athlete.gallery['galleryID'];
        gallerySnippet =
                    <ol><li><a href={galleryUrl}>{athlete.gallery['name']}</a></li></ol>
    } else {
        if (isEdit) {
            gallerySnippet =
            <p>
                Фотогалерея еще не введена<br />
                <input type="button" value="Ввести фотогалерею" onclick="location.href='new_a_gallery.php?id=<?= $athlet->id ?>'" />
            </p>
        } else {
            gallerySnippet = <p>Фотогалерею Ви зможете ввести після першого збереження спортсмена</p>
        }
    }

    let saveCallback = (data) => {
        // console.log('data', data);

        let response = data.response;
        if (response && typeof (response.id) !== 'undefined') {
            athlete.id = response.id;
        }

        // console.log('athlete after callback', athlete);
    }

    let getId = () => {
        return athlete.id;
    }

    return (<>
            <h2>{isEdit ? ('' + athlete.lastName + ' ' + athlete.firstName + ' ' + athlete.patronymic ) : "Створити нового спортсмена"}</h2>

            <form className="row" encType="multipart/form-data">
                <div className="col-sm-5 d-grid gap-3">
                    <div>
                        <label htmlFor="lastName" className="form-label">Прізвище</label>

                        <EditableText field="lastName" className="form-control"
                            // id={athlete.id}
                            getId={ getId }
                            // initialValue={() => athlete.lastName}
                            initialValue={ athlete.lastName }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="firstName" className="form-label">Ім'я</label>

                        <EditableText field="firstName" className="form-control"
                            // id={athlete.id}
                            getId={ getId }
                            initialValue={athlete.firstName}
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="patronymic" className="form-label">По батькові</label>

                        <EditableText field="patronymic" className="form-control"
                            // id={athlete.id}
                            getId={ getId }
                            initialValue={athlete.patronymic}
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="birthday" className="form-label">Дата народження</label>

                        <EditableDate field="birthday" className="form-control"
                            // id={athlete.id}
                            getId={ getId }
                            initialValue={athlete.birthday}
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="degree" className="form-label">Ступінь</label>

                        <EditableDegree field="degree" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.degree }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
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
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.phone }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone2" className="form-label">Додатковий телефон</label>

                        <EditableText field="phone2" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.phone2 }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">E-mail
                            <span className='text-secondary'> (
                                { isEdit && <>не можна редагувати</> }
                                { isNew && <>він же логін, редагується лише при створенні спортсмена,
                                думаю можна буде увімкнути редагування назавжди, потім, додавши ряд застережень</>}
                            )</span>
                        </label>

                        <EditableText field="email" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            type="email" disabled={isEdit}
                            initialValue={ athlete.email }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>
                </div>

                <div className="col-md-1"></div>

                <div className="col-md-6 mb-3">
                    <p style={{'backgroundColor': 'yellow'}}>Клубна інформація</p>

                    <EditableSwitch
                        field="is_actual" className="form-check-input"
                        // id={ athlete.id }
                        getId={ getId }
                        initialValue={ athlete.is_actual }
                        inlineUpdateUrl={updateUrl}
                        onBeforeSuccess={saveCallback}
                    >Належить до нашого клубу?
                    </EditableSwitch>

                    <EditableSwitch
                        field="show_in_blacks" className="form-check-input"
                        // id={ athlete.id }
                        getId={ getId }
                        initialValue={ athlete.show_in_blacks }
                        inlineUpdateUrl={updateUrl}
                        onBeforeSuccess={saveCallback}
                    >Показувати на сторінці чорних поясів нашого клубу (якщо досягнуто відповідного ступеню)?
                    </EditableSwitch>
                </div>

                <div className="mb-3 col-md-12 d-grid gap-3">
                    <p style={{'backgroundColor': 'yellow'}}>Про спортсмена</p>

                    <div>
                        <label htmlFor="full" className="form-label">Повна інформація для сторінки спортсмена</label>

                        <EditableTextarea field="full" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.full }
                            inlineUpdateUrl={updateUrl}
                            rows='10'
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <EditableSwitch
                        field="is_coach" className="form-check-input"
                        // id={ athlete.id }
                        getId={ getId }
                        initialValue={ athlete.is_coach }
                        inlineUpdateUrl={updateUrl}
                        onBeforeSuccess={saveCallback}
                    >Інструктор?
                    </EditableSwitch>

                    <div className="mb-2">
                        <label htmlFor="brief" className="form-label">Коротка інформація для сторінки зі списком всіх інструкторів</label>

                        <EditableTextarea field="brief" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.brief }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <EditableSwitch
                        field="is_best" className="form-check-input"
                        // id={ athlete.id }
                        getId={ getId }
                        initialValue={ athlete.is_best }
                        inlineUpdateUrl={ updateUrl }
                        onBeforeSuccess={ saveCallback }
                    >Показувати в кращих спортсменах?
                    </EditableSwitch>

                    <div className="mb-2">
                        <label htmlFor="briefBest" className="form-label">Коротка інформація для сторінки найкращих спортсменів</label>

                        <EditableTextarea
                            field="briefBest" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.briefBest }
                            inlineUpdateUrl={ updateUrl }
                            onBeforeSuccess={ saveCallback }
                        />
                    </div>
                </div>

                <div className="mb-3 col-md-12">
                    <p style={{'backgroundColor': 'yellow'}}>Зали</p>
                    <EditAttachedEntities
                        entityName='athlete'
                        // entityId={ athlete.id }
                        getId={ getId }
                        entityNameToAttach='dojo'
                        attachedEntities={ athlete.dojos }
                        updateUrl={updateUrl}
                        onBeforeSuccess={saveCallback}
                    />
                </div>

                <div className="mb-3 col-md-12 d-grid gap-3">
                    <p style={{'backgroundColor': 'yellow'}}>Соціальні мережі</p>

                    <div>
                        <label htmlFor="facebook" className="form-label">Facebook</label>

                        <EditableText field="facebook" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.facebook }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="instagram" className="form-label">Instagram</label>

                        <EditableText field="instagram" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.instagram }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="youtube" className="form-label">Youtube</label>

                        <EditableText field="youtube" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.youtube }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="twitter" className="form-label">Twitter</label>

                        <EditableText field="twitter" className="form-control"
                            // id={ athlete.id }
                            getId={ getId }
                            initialValue={ athlete.twitter }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditAthlete;
