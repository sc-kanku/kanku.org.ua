import {Link} from 'react-router-dom';

export default function ListButton({hrefPrefix, entity, children}) {
    let href = hrefPrefix + "/list";

    return(
        <>
            <Link to={href} type="button" className="btn btn-outline-success">
                <i className="fas fa-list"></i> {children} {entity}
            </Link>
        </>
    )
};
