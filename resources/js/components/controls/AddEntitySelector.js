import React, {useState, useEffect} from 'react';
import EntitySelector from './EntitySelector';

/**
 * Is used to
 *  - select dojo to add on Admin > Edit Athlete screen
 *  - select athlete to add on Admin > Edit Dojo screen
 */
const AddEntitySelector = function({entityName, url, onSelect, onAllLoaded}) {
    const [isAdding, setIsAdding] = useState(false);

    let selectEntity = ()=> {
        setIsAdding(!isAdding)
    }

    let onEntitySelect = (id)=> {
        onSelect(id);
        setIsAdding(false);
    };
    

    let addingSnippet = null;

    if (isAdding) {
        addingSnippet = <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
                <p className="card-text">
                    <EntitySelector url={url} onSelect={onEntitySelect} onAllLoaded={onAllLoaded} />
                </p>
            </div>
        </div>
    }

    return (
        <div style={{margin: '1em 2em'}}>
            <a className="btn btn-outline-success" onClick={selectEntity}>
                <i className="fas fa-plus" aria-hidden="true"></i> Додати { entityName }
            </a>

            {addingSnippet}
        </div>
    );
}

export default AddEntitySelector;
