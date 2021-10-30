import React, {useState, useEffect, useContext} from 'react';
import ScheduleHelper from './ScheduleHelper';
import Context from './../../Context';

/*
Warning: Maximum update depth exceeded. 
This can happen when a component calls setState inside useEffect, 
but useEffect either doesn't have a dependency array, or one of the dependencies 
changes on every render.
*/
// TODO: Infinite refresh loop
let counter1 = 0;

const Day = function({schedule, onRemove}) {
    const [scheduleModel, setScheduleModel] = useState(schedule);
    const {synchronizeGroup} = useContext(Context);

    useEffect(() => {
        if (counter1 < 10) {
            counter1++;
            synchronizeGroup(scheduleModel)
        }
    }, [scheduleModel]);

    const changeDay = (event) => {
        let newSchedule = {...scheduleModel};
        newSchedule.day = event.target.value;

        setScheduleModel(newSchedule);
    }

    const changeStart = (event) => {
        let newSchedule = {...scheduleModel};
        newSchedule.start = event.target.value;

        setScheduleModel(newSchedule);
    }

    const changeFinish = (event) => {
        let newSchedule = {...scheduleModel};
        newSchedule.finish = event.target.value;

        setScheduleModel(newSchedule);
    }

    return (
            <div className="row day">
                <div className="col-3">
                    <select className="value-day" defaultValue={scheduleModel.day} onChange={changeDay}>
                        <option key='Пн' value='Пн'>Пн</option>)
                        <option key='Вт' value='Вт'>Вт</option>)
                        <option key='Ср' value='Ср'>Ср</option>)
                        <option key='Чт' value='Чт'>Чт</option>)
                        <option key='Пт' value='Пт'>Пт</option>)
                        <option key='Сб' value='Сб'>Сб</option>)
                    </select>
                </div>

                <div className="col-4">
                    <input style={{border: '1px solid gray'}} className="value-start" type="time" defaultValue={scheduleModel.start} onChange={changeStart} />
                </div>

                <div className="col-4">
                    <input style={{border: '1px solid gray'}} className="value-finish" type="time" defaultValue={scheduleModel.finish} onChange={changeFinish} />
                </div>

                <div className="col-1">
                    <div className="close-day" title="Видалити цей день тижня" onClick={() => onRemove(scheduleModel)}>
                        <i class="far fa-trash-alt" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
    );
}

export default Day;