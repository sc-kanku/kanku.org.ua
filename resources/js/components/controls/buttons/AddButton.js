import React, {useMemo, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function AddButton({hrefPrefix, entity, children}) {
    const generateLink = () => hrefPrefix + "/new/" + Math.round(Math.random() * 1000);
    const [linkWithPar, setLinkWithPar] = useState(generateLink());
    const relink = () => setLinkWithPar(generateLink());

    return(
        <>
            <Link to={ linkWithPar } type="button" className="btn btn-outline-success" onClick={relink}>
                <i className="fas fa-plus"></i> {children} {entity}
            </Link>
        </>
    )
};
