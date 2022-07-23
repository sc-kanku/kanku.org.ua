import React, {useRef, useMemo} from "react";

const STATUS_DURATION = 2000;

/**
 * data: { value, ...otherFieldsThatWillBeSentWithRequest }
 *
 * When used from Editable components data = { id, field, value }
 */

/**
 * Provides status functionality for data saving actions.
 * When data is saved successfully - shows success status mark (green cirkle wich check),
 * if data is not saved or some error occurred - an error status mark is shown (red cirkle wich check).
 *
 * @param {*} data,
 * @param {*} save() - save function that data will be saved with
 * @param {*} setValue - function that the current value of the control is set with
 * @param {*} getNewValue - function to retrieve current value
 *
 * @returns StatusMarkup
 * @returns onChange - change event that is to be assigned to control
 * with value to be saved and sytatused
 */
export default function useStatus({ data, save, setValue, getNewValue, onBeforeSave }) {
    let isValue = typeof data.value != 'undefined';
    let isNewValue = typeof getNewValue == 'function';
    let isSetValue = typeof setValue == 'function';

    const [previousValue, setPreviousValue] = React.useState(isValue ? data.value : null);
    const [successfullyUpdated, setSuccessfullyUpdated] = React.useState(false);
    const [updatedWithFailure, setUpdatedWithFailure] = React.useState(false);

    React.useEffect(() => {
        setPreviousValue(isValue ? data.value : null)
    }, [isValue ? data.value : null]);

    function compareValuesAndSave (e) {
        // console.log('isNewValue', isNewValue);
        let newValue = isNewValue ? getNewValue(e) : null;

        // console.log(isNewValue, previousValue, newValue, isSetValue);
        if (!isNewValue || isNewValue && previousValue != newValue || e.forceSave) {
            if (isSetValue) {
                // console.log('setting new val');
                setValue(newValue);
            }

            if (isNewValue) {
                data.value = newValue;
            }

            // console.log('typeof (data.id)', typeof (data.id))
            // console.log('after typeof data', data)
            if (typeof (data.id) === 'function' ) {
                data.id = data.id();
            }
            // console.log('after typeof data', data)

            save({
                data,
                onSuccess: () => {
                    setSuccessfullyUpdated(true);
                    setPreviousValue(newValue);

                    setTimeout(() => {
                        setSuccessfullyUpdated(false)
                    }, STATUS_DURATION);
                },
                onFailure: () => {
                    setUpdatedWithFailure(true);

                    if (isSetValue) {
                        setValue(previousValue);
                    }

                    setTimeout(() => {
                        setUpdatedWithFailure(false);
                    }, STATUS_DURATION);
                }
            });
        }
    }

    const onChange = // useRef(
      e => {
        let doSave = typeof (onBeforeSave) === 'function' ? onBeforeSave(e) : true;

        if (typeof (onBeforeSave) === 'function') {
            if (doSave) {
                // Without this timeout newValue is always null
                setTimeout(() => compareValuesAndSave(e), 1000);
            }
        } else {
            compareValuesAndSave(e);
        }
    }
    // ).current;

    let classes = 'position-absolute top-50 end-0 translate-middle_ border border-light rounded-circle';

    let StatusMarkup = // useMemo(
      ({ children }) => (<>
        <div style={{position: "relative"}}>
            { children }
            { successfullyUpdated && <span className={`${classes} bg-success`} style={{margin: '0.2em'}}><i className="fas fa-check" style={{color: 'white', padding: '0.2em', fontSize: '0.7em', display: 'block'}}></i></span> }
            { updatedWithFailure  && <span className={`${classes} bg-danger`} style={{margin: '0.2em'}}><i className="fas fa-exclamation" style={{color: 'white', padding: '0.2em 0.5em', fontSize: '0.7em', display: 'block'}}></i></span> }
        </div>
    </>)
    // , []);

    return [StatusMarkup, onChange]
}
