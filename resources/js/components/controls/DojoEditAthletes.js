import React, {useState, useEffect, useContext} from 'react';

import Schedule from './schedule/Schedule'
import AddEntitySelector from './AddEntitySelector'
import EditButton from './buttons/EditButton';

const DojoEditAthletes = function({athletes, updateUrl}) {
    const [athletesModel, setAthletesModel] = useState(athletes);
    const [allAthletes, setAllAthletes] = useState([]);

    function onAllAthletesLoaded (allLoadedAthletes) {
        setAllAthletes(allLoadedAthletes);
    }

    const addAthlete = (id) => {
        if (id == "-1") { // Виберіть cпортсмена
        } else if (id == "0") { // Новий зал
        } else {
            let selectedAthlete = allAthletes.filter(athlete => athlete.id == id);
            let newAthletesModel = [...athletesModel].concat(selectedAthlete);

            setAthletesModel(newAthletesModel);
        }
    }

    const editAthlete = (id) => {
        console.log("edit - redirect to edit athlete page", id);
        // TODO:
        // redirect to edit dojo page
    }

    const deleteAthlete = (id) => {
        let athletes = athletesModel.filter(athlete => athlete.id != id);

        setAthletesModel(athletes);
    }

    // using effect hooks and deps to execute logic as componentWillMount
    useEffect(() => {
        // check that props.data.status is non-empty and update statusValue
        if (athletes !== null) {
            setAthletesModel(athletes);
        }
      }, [athletes]);

    let areSomeAthletes = athletesModel && athletesModel.length > 0;
    let athletesSnippet = null;

    if (areSomeAthletes) {
        let athletesArray = [];

        athletesModel.map((athlete, index) => {
            let athleteUrl = "/admin/athlete/edit/" + athlete.id;
            let athleteName = athlete.lastName + ' ' + athlete.firstName + ' ' + athlete.patronymic;

            let scheduleUrl = updateUrl + '/schedule' + '/' + athlete.id;

            athletesArray.push(
                <li key={index}>
                    <a href={athleteUrl}>{athleteName}</a>
                    
                    <EditButton hrefPrefix='/admin/athlete' value={athlete.id}>Редагувати інструктора</EditButton>

                    <a className="btn btn-outline-success" onClick={() => deleteAthlete(athlete.id)}>
                        <i className="fas fa-delete"></i> Видалити інструктора
                    </a>

                    <Schedule 
                        markup={athlete.pivot?.schedule } 
                        editable={false}
                        saveUrl={scheduleUrl}
                    />
                </li>
            );
        });

        athletesSnippet = <>
            <ol>{athletesArray}</ol>
            <AddEntitySelector url="/api/athletes" onSelect={addAthlete} onAllAthletesLoaded={onAllAthletesLoaded} />
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
        {athletesSnippet}
        </>
    );
}

export default DojoEditAthletes;
