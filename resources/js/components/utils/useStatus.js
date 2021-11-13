import React, {useRef, useMemo} from "react";

const STATUS_DURATION = 2000;

/**
 * data: { value, ...otherFieldsThatWillBeSentWithRequest }
 *
 * When used from Editable components data = { id, field, value }
 */
export default function useStatus({ data, save, setValue, getNewValue }) {
    let isValue = typeof data.value != 'undefined';
    let isNewValue = typeof getNewValue == 'function';
    let isSetValue = typeof setValue == 'function';

    const [previousValue, setPreviousValue] = React.useState(isValue ? data.value : null);
    const [successfullyUpdated, setSuccessfullyUpdated] = React.useState(false);
    const [updatedWithFailure, setUpdatedWithFailure] = React.useState(false);

    React.useEffect(() => {
      setPreviousValue(isValue ? data.value : null)
    }, [isValue ? data.value : null]);

    const onChange = // useRef(
      e => {
        // console.log('isNewValue', isNewValue);

        let newValue = isNewValue ? getNewValue(e) : null;

        // console.log('newValue', newValue);

        // console.log(newValue);

        // console.log(isNewValue, previousValue, newValue, isSetValue);

        if (!isNewValue || isNewValue && previousValue != newValue || e.forceSave) {
          if (isSetValue) {
            // console.log('setting new val');
            setValue(newValue);
          }

          if (isNewValue) {
            data.value = newValue;
          }

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
            }}
        );
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
