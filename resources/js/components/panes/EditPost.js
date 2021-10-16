import React, {useMemo, useState, useEffect} from 'react';
import { useParams, Redirect} from 'react-router-dom';

import PostCategory from './../controls/PostCategory'

const EditPost = ({getUrl, updateUrl, photoFileName}) => {
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
        const formData = new FormData( document.getElementById('edit-post') );

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
    let editHeader = isEdit  ?  "Відредагувати " + editedData.title : "Додати новину";
    let editEntityHiddenInputId = isEdit && <input type="hidden" name="id" value={editedData.id} />
    let postCategory = isEdit && <PostCategory value={editedData.category} editable={true} />
    let photoUrl = editedData && ("/images/posts/" + editedData.id + "/photo.jpg");

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

            <form id="edit-post" method="post" action={updateUrl} encType="multipart/form-data">
                {editEntityHiddenInputId}

                <table className="usual" cellSpacing="0">
                    <tbody>
                    <tr>
                        <td>Заголовок</td>
                        <td><input type="text" name="title"  defaultValue={isEdit && editedData.title} /></td>
                    </tr>

                    <tr>
                        <td>Категория</td>
                        <td>{postCategory}</td>
                    </tr>

                    <tr>
                        <td>Дата</td>
                        <td><input name="dateAt" type="date" defaultValue={isEdit && editedData.dateAt}/></td>
                    </tr>

                    <tr>
                        <td>Ключові слова для метатегу сторінки новини</td>
                        <td><textarea name="keywords">{isEdit && editedData.keywords}</textarea></td>
                    </tr>

                    <tr>
                        <td>Повний текст новини</td>
                        <td><textarea name="full">{isEdit && editedData.full}</textarea></td>
                    </tr>

                    <tr>
                        <td>Короткий текст для сторінки списку новин</td>
                        <td><textarea name="brief">{isEdit && editedData.brief}</textarea></td>
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
                            <br/>Буде автоматично створено preview с шириною 200px
                        </td>
                    </tr>
    
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

export default EditPost;

