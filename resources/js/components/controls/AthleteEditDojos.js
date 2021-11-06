import React, {useState, useEffect, useContext} from 'react';

import Schedule from './schedule/Schedule'
import AddEntitySelector from './AddEntitySelector'
import useSave from './../utils/useSave';

const AthleteEditDojos = function({athleteId, dojos, updateUrl}) {
    const [dojosModel, setDojosModel] = useState(dojos);
    const [allDojos, setAllDojos] = useState([]);
    // TODO: refactor useSave to be suitable one for both actions.
    let [saveRequest] = useSave('/api/athlete/update/schedule');
    let [deleteRequest] = useSave('/api/athlete/dojo/delete');

    function onAllDojosLoaded (allLoadedDojos) {
        setAllDojos(allLoadedDojos);
    }

    const addDojo = (dojoId) => {
        if (dojoId == "-1") { // Виберіть зал
        } else if (dojoId == "0") { // Новий зал
            // TODO: 
        } else {
            let selectedDojo = allDojos.filter(dojo => dojo.id == dojoId);
            let newDojosModel = [...dojosModel].concat(selectedDojo);

            setDojosModel(newDojosModel);

            saveRequest({data : { 
                    athleteId, dojoId, schedule : '' 
            }});
        }
    }

    const deleteDojo = (dojoId) => {
        let dojos = dojosModel.filter(dojo => dojo.id != dojoId);

        setDojosModel(dojos);

        deleteRequest({data: {
            athleteId, dojoId
        }})
    }

    // using effect hooks and deps to execute logic as componentWillMount
    useEffect(() => {
        // check that props.data.status is non-empty and update statusValue
        if (dojos !== null) {
            setDojosModel(dojos);
        }
      }, [dojos]);

    let areSomeDojos = dojosModel && dojosModel.length > 0;
    let dojosSnippet = null;

    if (areSomeDojos) {
        let dojosArray = [];

        dojosModel.map((dojo, index) => {
            let dojoUrl = "/admin/dojo/edit/" + dojo.id;
            let scheduleUrl = updateUrl + '/schedule';

            dojosArray.push(
                <li key={index}>
                    <div className="input-group" role="group" aria-label="Dojo actions">
                        <a className="input-group-text alert-success" href={dojoUrl}>{dojo.name}</a>

                        <a className="btn btn-outline-success" href={dojoUrl}>
                            <i className="fas fa-edit"></i> Редагувати зал
                        </a>

                        <a className="btn btn-outline-success" onClick={() => deleteDojo(dojo.id)}>
                            <i className="far fa-trash-alt"></i>
                        </a>
                    </div>
                    
                    <Schedule 
                        athleteId={athleteId}
                        dojoId={dojo.id}
                        markup={dojo.pivot?.schedule}
                        editable={false}
                        saveUrl={scheduleUrl}
                    />
                </li>
            );
        });

        dojosSnippet = <>
            <ol>{dojosArray}</ol>
            <AddEntitySelector url="/api/dojo/list" onSelect={addDojo} onAllLoaded={onAllDojosLoaded} />
        </>
    } else {
        if (!true) {            
//                dojosSnippet = <p>Зали ще не вказані.<br />Вказівка ​​залів для інструктора - у розділі <a href="gymnasiums.php">зали</a></p>
        } else {
//              dojosSnippet = <p>Залы Вы зможете вказати після першого збереження спортсмена</p>
        }
    }

    // useEffect(showDojos, [dojosModel]);

    return (
        <>
            <AddEntitySelector url="/api/dojo/list" onSelect={addDojo} onAllLoaded={onAllDojosLoaded} />
            {dojosSnippet}
        </>
    );
}

export default AthleteEditDojos;
