import React, {useState, useEffect, useContext} from 'react';
import ScheduleHelper from './ScheduleHelper';
import Day from './Day';
// import Context from './../../Context';

let counter2 = 0;

/** 
 * group = {
 *      name 
 *      schedule = [ <Day> ]
 * }
 */
const Group = function({group, onRemove, onLeft, onRight, changeCallback}) {
    const [groupModel, setGroupModel] = useState(group);
    // const [norma, ] = useState();
    // const {synchronizeGroups} = useContext(Context);

    // const countNorma = () => {
    //     // return ScheduleHelper.groupToString(groupModel);

    //     return groupModel.schedule.reduce((previousValue, currentValue) => ('' + previousValue + currentValue.day + currentValue.start + currentValue.finish) );
    // }
/*
    useEffect(() => {
        if (counter2 < 100) {
            console.log("Group", counter2, groupModel);

            counter2++;

            changeCallback(groupModel);            
            // synchronizeGroups(groupModel)
        }
    }, []);
*/
    const addDay = function() {
        let newDay = ScheduleHelper.newDayModel();
        let resultingDays = groupModel.schedule.concat([newDay]);

        let newGroupModel = {
            ...groupModel, 
            schedule: resultingDays
        };

        setGroupModel(newGroupModel);
        changeCallback(newGroupModel);
    }

    const removeDay = function(day) {
        let position = ScheduleHelper.getIndex(groupModel.schedule, day);

        let resultingDays = groupModel.schedule
            .slice(0, position)
            .concat(
                groupModel.schedule.slice(position + 1)
            );

        let newGroupModel = {
            ...groupModel, 
            schedule: resultingDays
        };

        setGroupModel(newGroupModel);
        changeCallback(newGroupModel);
    }
    
    const changeName = (e) => {
        let newGroupModel = {
            ...groupModel, 
            name: e.target.value
        };

        setGroupModel(newGroupModel);
    }

    const blurName = (e) => {
        changeCallback(groupModel);
    }

    const synchronizeGroup = (scheduleDay) => {
        let position = ScheduleHelper.getIndex(groupModel.schedule, scheduleDay);

        let synchronizedGroup = {...groupModel};
        synchronizedGroup.schedule[position] = scheduleDay;

        setGroupModel(synchronizedGroup);

        // synchronizeGroups is called automatically when synchronizedGroup has been sychronized
        // (because of useEffect)
    }

    return (
        // <Context.Provider value={{synchronizeGroup}}>
        <div className="group card card-outline-secondary">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <div className="label-group-name col-8 form-label">Назва групи</div>

                        <div className="btn-delete" style={{verticalAlign: 'middle'}} title="Видалити цю групу" onClick={() => onRemove(groupModel)}>
                            <i className="far fa-trash-alt" aria-hidden="true"></i>
                        </div>
                        <div className="move-right" title="Перемістити цю групу вперед" onClick={() => onRight(groupModel)}>&gt;</div>
                        <div className="move-left" title="Перемістити цю групу назад" onClick={() => onLeft(groupModel)}>&lt;</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input className="value-name" style={{border: '1px solid gray'}} 
                            type="text" 
                            value={groupModel.name} onBlur={blurName} onChange={changeName} 
                        />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="form-label col-3">День</div>
                    <div className="form-label col-4">Початок</div>
                    <div className="form-label col-4">Закінчення</div>
                    <div className="col-1">
                        <div className="add-day" title="Додати ще один день тижня" onClick={addDay}>+</div>
                    </div>
                </div>
                {/* {editableDays} */}
                {groupModel.schedule.map(day => 
                    <Day 
                        key={ScheduleHelper.generateId()} 
                        schedule={day} 
                        onRemove={removeDay} 
                        changeCallback={synchronizeGroup} 
                    />
                )}
            </div>
        </div>
        // </Context.Provider>
)}

export default Group;