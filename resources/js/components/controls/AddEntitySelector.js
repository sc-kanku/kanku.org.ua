import React, {useState, useEffect} from 'react';
import EntitySelector from './EntitySelector';

const AddEntitySelector = function({url, onSelect, onAllLoaded}) {
    const [isAdding, setIsAdding] = useState(false);

    let selectEntity = ()=> {
        setIsAdding(!isAdding)
    }
/*
    let addDojo = ()=> {
        setIsAddingDojo(false);
        // ad
    };

    let cancel = ()=> {
        setIsAddingDojo(false);
    };
*/
    let onEntitySelect = (id)=> {
        onSelect(id);
        setIsAdding(false);
    };
    

    let addingSnippet = null;

    if (isAdding) {
        addingSnippet = <div className="card" style={{width: '18rem'}}>
            {/*
            <img src="..." className="card-img-top" alt="..." />
            */}

            <div className="card-body">
{/*
                <h5 className="card-title">Виберіть зал</h5>
*/}
                <p className="card-text">
                    <EntitySelector url={url} onSelect={onEntitySelect} onAllLoaded={onAllLoaded} />
{/*
                    <a className="btn btn-outline-success" onClick={addDojo}>
                        <i className="fas fa-ok"></i> Ок
                    </a>

                    <a className="btn btn-outline-success" onClick={cancel}>
                        <i className="fas fa-cancel"></i> Cancel
                    </a>
*/}
                </p>
            </div>
        </div>
    }

    return (
    <>
        <a className="btn btn-outline-success" onClick={selectEntity}>
            <i className="fas fa-calendar-plus"></i> Додати
        </a>

        {addingSnippet}
    </>
    );
}

export default AddEntitySelector;
