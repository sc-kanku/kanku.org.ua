import React, {useState, useEffect, useContext} from 'react';

import Schedule from './schedule/Schedule'
import AddEntitySelector from './AddEntitySelector'
import useEditable from '../utils/useEditable';

// EditAttachedEntities -> AthleteEditDojos
// entityId -> athleteId
// attachedEntities -> dojos
// entityName, entityNameToAttach = { dojo | athlete }
/**
 * Is Used to
 *  - edit attached to athlete dojos on Admin > Edit Athlete screen
 *  - edit attached to dojo athletes on Admin > Edit Dojo screen
 *
 * entityName - Name of the 'main' entity
 *      i.e. 'athlete' when used on Edit Athlete screen
 *      and 'dojo' when used on Edit Dojo screen
 *
 * entityNameToAttach - Name of the entity that is attached
 *      i.e. 'athlete' when used on Edit Dojo screen (athletes are attached to the dojo that is currently being edited)
 *      and 'dojo' when used on Edit Dojo screen (dojos are attached to the athlete that is currently being edited)
 *
 * @param {*} param0
 * @returns
 */
const EditAttachedEntities = function({ entityName, entityId, entityNameToAttach, attachedEntities, updateUrl, getId, onBeforeSuccess }) {
    const [attachedEntitiesState, setAttachedEntitiesState] = useState(attachedEntities);
    const [allEntitiesToAttachFrom, setAllEntitiesToAttachFrom] = useState([]);
    const [attachedEntityId, setAttachedEntityId] = useState(null);
    const [detachedEntityId, setDetachedEntityId] = useState(null);

    entityId = entityId ? entityId : getId ? getId() : null;

    // TODO: refactor useEditable to be suitable one for both actions.
    const [SavingStatus, value_unused, saveAttachedEntity] = useEditable( {
        inlineUpdateUrl : '/api/athlete/update/schedule',
        data: {
            [entityName + 'Id']: entityId,
            [entityNameToAttach + 'Id']: attachedEntityId,
            schedule : ''
        },
        onBeforeSuccess: (data) => {
            // console.log('onBeforeSuccess');

            if (typeof onBeforeSuccess == 'function') {
                onBeforeSuccess(data);
            }

            let selectedEntityToAttach = allEntitiesToAttachFrom.filter(dojo => dojo.id == attachedEntityId);
            let newAttachedEntitiesState = [...attachedEntitiesState].concat(selectedEntityToAttach);

            setAttachedEntitiesState(newAttachedEntitiesState);
        }
    });

    // RemoveDojoEditable,sfsfd, removeDojo
    const [RemovalStatus, value_unused_refactior_this, saveDetachedEntity] = useEditable( {
        inlineUpdateUrl : '/api/athlete/dojo/delete',
        data: {
            [entityName + 'Id'] : entityId,
            [entityNameToAttach + 'Id'] : detachedEntityId
        },
        onBeforeSuccess: (data) => {
            let attachedEntities = attachedEntitiesState.filter(entity => entity.id != detachedEntityId);

            setAttachedEntitiesState(attachedEntities);
        }
    });

    useEffect(() => {
        if (attachedEntityId > 0) {
            saveAttachedEntity();
        }
    }, [attachedEntityId]);

    useEffect(() => {
        if (detachedEntityId !== null) {
            saveDetachedEntity();
        }
    }, [detachedEntityId]);

    const attachEntity = (entityId) => {
        if (entityId == "-1") { // Виберіть зал
        } else if (entityId == "0") { // Новий зал
            // TODO:
        } else {
            setAttachedEntityId(entityId);
        }
    }

    // using effect hooks and deps to execute logic as componentWillMount
    useEffect(() => {
        if (attachedEntities !== null) {
            setAttachedEntitiesState(attachedEntities);
        }
      }, [attachedEntities]);

    let areSomeEntitiesAttached = attachedEntitiesState && attachedEntitiesState.length > 0;
    let attachedSnippet = null;

    if (areSomeEntitiesAttached) {
        let attachedArray = [];

        attachedEntitiesState.map((entity, index) => {
            let entityUrl = '/admin/' + entityNameToAttach + '/edit/' + entity.id;
            // let scheduleUrl = updateUrl + '/schedule';
            let scheduleUrl = '/api/athlete/update/schedule';

            let entitiesParams = {
                [entityName + 'Id'] : entityId,
                [entityNameToAttach + 'Id'] : entity.id,
            }

            attachedArray.push(
                <li key={index}>
                    <div className="input-group" role="group" aria-label="Dojo actions">
                        <a className="input-group-text alert-success" href={entityUrl}>{entity.name ? entity.name : entity.lastName + ' ' + entity.firstName}</a>

                        <a className="btn btn-outline-success" href={entityUrl}>
                            <i className="fas fa-edit"></i> Редагувати { entityNameToAttach }
                        </a>

                        <a className="btn btn-outline-success" onClick={() => setDetachedEntityId(entity.id)}>
                            <i className="far fa-trash-alt"></i>
                        </a>
                    </div>

                    <Schedule
                        { ...entitiesParams }
                        markup={entity.pivot?.schedule}
                        editable={false}
                        saveUrl={scheduleUrl}

                    />
                </li>
            );
        });

        attachedSnippet = <>
            <ol>{ attachedArray }</ol>

            <SavingStatus />
            <RemovalStatus />
            <AddEntitySelector
                entityName={entityNameToAttach}
                url={`/api/${ entityNameToAttach }/list`}
                onSelect={attachEntity}
                onAllLoaded={setAllEntitiesToAttachFrom}
            />
        </>
    } else {
        if (!true) {
//                dojosSnippet = <p>Зали ще не вказані.<br />Вказівка ​​залів для інструктора - у розділі <a href="gymnasiums.php">зали</a></p>
        } else {
//              dojosSnippet = <p>Залы Вы зможете вказати після першого збереження спортсмена</p>
        }
    }

    // useEffect(showDojos, [attachedEntitiesState]);

    return (
        <>
            <SavingStatus />
            <RemovalStatus />
            <AddEntitySelector
                entityName={ entityNameToAttach }
                url={ `/api/${ entityNameToAttach }/list` }
                onSelect={ attachEntity }
                onAllLoaded={ setAllEntitiesToAttachFrom }
            />
            { attachedSnippet }
        </>
    );
}

export default EditAttachedEntities;
