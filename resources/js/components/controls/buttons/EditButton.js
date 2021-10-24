import {Link} from 'react-router-dom';

export default function EditButton({hrefPrefix, value, children}) {
    let href = hrefPrefix + "/edit/" + value;

    return(
        <>
            <Link to={href} type="button" className="btn-sm btn-outline-success">
                <i className="fas fa-user-edit"></i> {children}
            </Link>
        </>
    )
};
