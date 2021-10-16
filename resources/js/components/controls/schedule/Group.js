import React, {useState, useEffect, useContext} from 'react';
import ScheduleHelper from './ScheduleHelper';
import Day from './Day';
import Context from './../../Context';

let counter2 = 0;

const Group = function({group, onRemove, onLeft, onRight}) {
    const [groupModel, setGroupModel] = useState(group);
    const {synchronizeGroups} = useContext(Context);

    useEffect(() => {
        if (counter2 < 10) {
            counter2++;

            synchronizeGroups(groupModel)
        }
    }, [groupModel]);

    const addDay = function() {
        let newDay = ScheduleHelper.newDayModel();
        let resultingDays = groupModel.schedule.concat([newDay]);

        setGroupModel({
            ... groupModel, 
            schedule: resultingDays
        });
    }

    const removeDay = function(day) {
        let position = ScheduleHelper.getIndex(groupModel.schedule, day);

        let resultingDays = groupModel.schedule
            .slice(0, position)
            .concat(
                groupModel.schedule.slice(position + 1)
            );

            setGroupModel({
                ... groupModel, 
                schedule: resultingDays
            });
    }
    
    let editableDays = [];

    groupModel.schedule.map(day => editableDays.push(<Day key={ScheduleHelper.generateId()} schedule={day} onRemove={removeDay} />))

    const synchronizeGroup = (scheduleDay) => {
        let position = ScheduleHelper.getIndex(groupModel.schedule, scheduleDay);

        let synchronizedGroup = {...groupModel};
        synchronizedGroup.schedule[position] = scheduleDay;

        setGroupModel(synchronizedGroup);

        // synchronizeGroups is called automatically when synchronizedGroup has been sychronized
        // (because of useEffect)
    }

    return (
        <Context.Provider value={{synchronizeGroup}}>
        <div className="group card card-outline-secondary">
            <div className="card-header">
                <div className="row">
                    <div className="col">
                        <div className="label-group-name col-9">Назва групи</div>
                        <div className="move-left" title="Перемістити цю групу назад" onClick={() => onLeft(groupModel)}>&lt;</div>
                        <div className="move-right" title="Перемістити цю групу вперед" onClick={() => onRight(groupModel)}>&gt;</div>
                        <div className="btn-close" title="Видалити цю групу" onClick={() => onRemove(groupModel)}></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input className="value-name" style={{border: '1px solid gray'}} type="text" defaultValue={group.name} />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="label col-3">День</div>
                    <div className="label col-4">Початок</div>
                    <div className="label col-4">Закінчення</div>
                    <div className="col-1">
                        <div className="add-day" title="Додати ще один день тижня" onClick={addDay}>+</div>
                    </div>
                </div>
                {editableDays}
            </div>
        </div>
        </Context.Provider>
)}

export default Group;