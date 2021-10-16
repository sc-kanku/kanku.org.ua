import {Link} from 'react-router-dom';

export default function AddButton({hrefPrefix, entity, children}) {
    let href = hrefPrefix + "/new";

    return(
        <>
            <Link to={href} type="button" className="btn btn-outline-success">
                <i className="fas fa-plus"></i> {children} {entity}
            </Link>
        </>
    )
};
