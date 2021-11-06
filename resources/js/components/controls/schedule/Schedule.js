import React, { useState, useEffect } from 'react';
import ScheduleHelper from './ScheduleHelper';
import Group from './Group';
// import Context from './../../Context';
import useSave from './../../utils/useSave';

const Schedule = ({athleteId, dojoId, markup, editable, saveUrl}) => {
    const [isEditable, setEditable] = useState(editable);
    // TODO: use useEditable here.
    let [saveRequest] = useSave(saveUrl, () => {});

    let parsedGroups = ScheduleHelper.parseGroups(markup);

    const [initialGroups, setInitialGroups] = useState(parsedGroups);
    const [groups, setGroups] = useState(parsedGroups);

    const edit = () => {
        setEditable(true);
    }

    const cancel = () => {
        setEditable(false);
        setGroups(initialGroups);
    }

    const save = () => {
        setEditable(false);
        setInitialGroups(groups);
        saveToServer();
    }

    const saveToServer = (e) => {
        let dataObj = { 
            athleteId, dojoId, schedule : ScheduleHelper.scheduleToString(groups) 
        }; 

        saveRequest({
            dataObj,
            onSuccess : () => {console.log('ok')}, 
            onFailure : () => {console.log('f')}
        });

        // setIsSavingDone(true);
        // TODO: synch
        // setEditedData(editedData);
    }

    const addGroup = function() {
        let newGroup = ScheduleHelper.newGroupModel();
        let resultingGroups = [newGroup].concat(groups);
    
        setGroups(resultingGroups);
    };

    let editControls = isEditable ? (
        <>
            <a className="btn btn-outline-success" onClick={addGroup}>
                <i className="fas fa-plus" aria-hidden="true"></i> Додати нову групу
            </a>

            <a className="btn btn-success" onClick={save}>
                <i className="fas fa-check"></i> Зберегти
            </a>

            <a className="btn btn-outline-secondary" onClick={cancel}>
                <i aria-hidden="true" className="btn btn-close" style={{verticalAlign: 'bottom'}}></i> Вимкнути редагування / не зберігати
            </a>
        </>
    ) : (
        <a className="btn btn-outline-success" onClick={edit}>
            <i className="fas fa-edit"></i> Редагувати розклад
        </a>
    );

    let editableOrNonEditableContent = '';

    if (!isEditable) {
        editableOrNonEditableContent = <div dangerouslySetInnerHTML={{ __html: ScheduleHelper.scheduleToString(groups) }} />
    } else {
        const removeGroup = function(group) {
            // TODO: Array filter method!
            let position = ScheduleHelper.getIndex(groups, group);

            let resultingGroups = groups
                .slice(0, position)
                .concat(
                    groups.slice(position + 1)
                );

            setGroups(resultingGroups);
        };

        const moveLeft = function(group) {
            let position = ScheduleHelper.getIndex(groups, group);

            if (position > 0) {
                let prevPosition = position - 1;

                let leftSlice = groups.slice(0, prevPosition);
                let rightSlice = groups.slice(position + 1, groups.length);

                let resultingGroups = []
                    .concat(leftSlice)
                    .concat([group])
                    .concat([groups[prevPosition]])
                    .concat(rightSlice);

                setGroups(resultingGroups);
            }
        }

        const moveRight = function (group) {
            let position = ScheduleHelper.getIndex(groups, group);

            if (position < groups.length - 1) {
                let nextPosition = position + 1;

                let leftSlice = groups.slice(0, position);
                let rightSlice = groups.slice(nextPosition + 1, groups.length);

                let resultingGroups = []
                    .concat(leftSlice)
                    .concat([groups[nextPosition]])
                    .concat([group])
                    .concat(rightSlice);

                    setGroups(resultingGroups);
            }
        }

        const synchronizeGroups = (groupInGroupsArrayToSynchronize) => {
            let i = ScheduleHelper.getIndex(groups, groupInGroupsArrayToSynchronize);
            let synchronizedGroups = [...groups];
    
            synchronizedGroups[i] = groupInGroupsArrayToSynchronize;
    
            setGroups(synchronizedGroups);
        }

        let groupsControls = [];
        
        groups.map(group => groupsControls.push(
            <Group group={group} 
                onRemove={removeGroup} 
                onLeft={moveLeft} 
                onRight={moveRight} 
                key={ScheduleHelper.generateId()} 
                changeCallback={synchronizeGroups}
            />
        ));

        editableOrNonEditableContent = 
            <>
                {groupsControls}
            </>
    }

    return (
        // <Context.Provider value={{synchronizeGroups}}>
        <>
            <div className="input-group mt-3 mb-3">
                <span className="input-group-text">Розклад</span>
                {editControls}
            </div>
            
            {editableOrNonEditableContent}
        </>
        // </Context.Provider>
    );
}

export default Schedule;
