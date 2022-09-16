import {React, useEffect, useState} from 'react';

import GalleryPhoto from '../controls/GalleryPhoto';

const Gallery = ({initialValue, className, ...props }) => {
    let gallery = initialValue;
    let gallerySnippet = null;
    let photoHtmlItems = null;

    if (gallery && gallery.photos && gallery.photos.length > 0)  {
        var isPreviousPhoto = false;
        let clazz = gallery.is_titles ? "gallery titles" : "gallery";

        let rr = gallery.photos.reduce((q,w) => 1, 2);

        photoHtmlItems = gallery.photos.reduce((reduced, photo) => {
            if (photo.item_type == 1) {
                reduced[reduced.length] = {};
                // <div class={clazz}>
                reduced[reduced.length - 1].photo = <>
                    <GalleryPhoto field="photo" className="form-control__"
                                // id = {athlete.id}
                                getId={ gallery.pivot.athlete_id }
                                // initialValue={"/images/athletes/" + athlete.id + "/photo.png"}
                                // initialValue={"/images/athletes/" + getId() + "/photo.png"}
                                initialValue={"/images/galleries/gallery" + gallery.id + "/" + photo.id + "/preview.jpg"}
                                // images/galleries/gallery3/757/
                                // inlineUpdateUrl={updateUrl}
                                // onBeforeSuccess={saveCallback}
                                mode='gallery'
                        />
                        <p>{photo.title}</p>
                    </>
                    // </div>
            } else if (photo.item_type == 2) {
                reduced[reduced.length - 1].description = photo.title
            }

            return reduced;
        }, []);

        // console.log("photoHtmlItems 1:", photoHtmlItems);
        photoHtmlItems = photoHtmlItems.map(photo => {
            return <div>
                {photo.photo}
                {/* <p>{photo.description}</p> */}
            </div>
        });

        // console.log("photoHtmlItems 2:", photoHtmlItems);
    }
            // let galleryUrl = "photo.php?galleryID=" + athlete.gallery['galleryID'];
            // gallerySnippet =
            //             <ol><li><a href={galleryUrl}>{athlete.gallery['name']}</a></li></ol>
    // } else {
            // if (isEdit) {
            //     gallerySnippet =
            //     <p>
            //         Фотогалерея еще не введена<br />
            //         <input type="button" value="Ввести фотогалерею" onclick="location.href='new_a_gallery.php?id=<?= $athlet->id ?>'" />
            //     </p>
            // } else {
            //     gallerySnippet = <p>Фотогалерею Ви зможете ввести після першого збереження спортсмена</p>
            // }

    // gallerySnippet += <>sdflskdflskjd</>

    return (<div class="gallery titles">{photoHtmlItems}</div>)
};

export default Gallery;
