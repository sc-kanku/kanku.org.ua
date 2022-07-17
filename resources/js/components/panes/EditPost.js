import React, {useMemo, useState, useEffect} from 'react';
import { useParams, useLocation, Redirect} from 'react-router-dom';

import PostCategory from './../controls/PostCategory';
import Photo from '../controls/Photo';
import { EditablePostCategory, EditableText, EditableDate, EditableDegree, EditableSwitch, EditableTextarea } from '../controls/Table';

const EditPost = ({getUrl, updateUrl}) => {
    let { id } = useParams();
    const location = useLocation();
    const [post, setPost] = useState({});

    // TODO: id dep?
    useEffect(() => {
        fetch(getUrl + "/" + id)
            .then(response => response.json())
            .then(setPost)
    }, []);

    let isNew = location.pathname.indexOf('new') !== -1;
    let isEdit = !isNew;
    // let isEdit = id != null;

    useEffect(() => {
        if (isEdit) {
            fetch(getUrl + "/" + id)
                .then( response => response.json() )
                .then( setPost )
        } else if (isNew) {
            // console.log('setting up new post');

            setPost({
                'category' : 0,
                'dateAt' : '2022-02-23',
                'keywords': '',
                'title': '',
                'brief': '',
                'full': '',
                'page_dir': '',
                'nid': 0
            })
        }
    }, [location.key]);

    // let editHeader = isEdit  ?  "Відредагувати " + post.title : "Створити новину";
    // let editEntityHiddenInputId = isEdit && <input type="hidden" name="id" value={post.id} />
    // let postCategory = isEdit && <PostCategory value={post.category} editable={true} />
    // let photoUrl = post && ("/images/posts/" + post.id + "/photo.jpg");

    let garrerySnippet = "";

    if (isEdit && post.gallery) {
        let galleryUrl = "photo.php?galleryID=" + post.gallery['galleryID'];
        garrerySnippet =
                    <ol><li><a href={galleryUrl}>{post.gallery['name']}</a></li></ol>
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
            post.id = response.id;
        }
        // console.log('athlete after callback', athlete);
    }

    let getId = () => {
        return post.id;
    }

    return (
        <>
            <h2>{ isEdit ? post.title : "Новий пост" }</h2>

            <form encType="multipart/form-data" className="row">
                <div className="col-sm-12 d-grid mb-3">
                    <div>
                        <label htmlFor="title" className="form-label">Заголовок</label>

                        <EditableText field="title" className="form-control"
                            // id={id}
                            getId={ getId }
                            initialValue={ post.title }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>
                </div>

                <div className="col-sm-5 d-grid gap-3 mb-3">
                    <div>
                        <label htmlFor="category" className="form-label">Категорія</label>

                        <EditablePostCategory field="category" className="form-control"
                            // id={id}
                            getId={ getId }
                            initialValue={ post.category }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="birthday" className="form-label">Дата</label>

                        <EditableDate field="dateAt" className="form-control"
                            // id={isEdit && post.id}
                            getId={ getId }
                            initialValue={ post.dateAt }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>
{/* TODO: keywords*/}
{/*
                    <div>
                        <label htmlFor="keywords" className="form-label">Ключові слова для метатегу сторінки новини</label>

                        <EditableTextarea field="keywords" className="form-control"
                            id={isEdit && post.id}
                            initialValue={isEdit ? post.keywords : ''}
                            inlineUpdateUrl={updateUrl}
                        />
                    </div>
*/}
                </div>

                <div className="col-sm-1 d-grid mb-3"></div>

                <div className="mb-3 col-sm-6">
                    <label htmlFor="photo" className="form-label">Фото</label>

                    <Photo id="photo" name="photo" className="form-control"
                        url={post && ("/images/dojos/" + post.id + "/photo.png")}
                        alt={isEdit ? ('' + post.title) : "Фото новини"}
                        editable={true}
                    />
                    Буде автоматично створено preview с шириною 300px
                </div>

                <div className="mb-3 col-sm-12 gap-3">
                    <div className="mb-3">
                        <label htmlFor="full" className="form-label">Повний текст новини</label>

                        <EditableTextarea field="full" className="form-control"
                            getId={ getId }
                            // id={isEdit && post.id}
                            initialValue={ post.full }
                            inlineUpdateUrl={updateUrl}
                            rows={10}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>

                    <div>
                        <label htmlFor="brief" className="form-label">Короткий текст для сторінки списку новин</label>

                        <EditableTextarea field="brief" className="form-control"
                            getId={ getId }
                            // id={isEdit && post.id}
                            initialValue={ post.brief }
                            inlineUpdateUrl={updateUrl}
                            onBeforeSuccess={saveCallback}
                        />
                    </div>
                </div>

{/*
                    <tr>
                        <td>Фотогалерея</td>
                        <td>{garrerySnippet}</td>
                    </tr>
*/}

            </form>
        </>
    )
};

export default EditPost;

