import React, {useRef, useMemo} from "react";

const STATUS_DURATION = 2000;

export default function useStatus({ id, field, initialValue, save, setValue, getNewValue }) {
    const [previousValue, setPreviousValue] = React.useState(initialValue);
    const [successfullyUpdated, setSuccessfullyUpdated] = React.useState(false);
    const [updatedWithFailure, setUpdatedWithFailure] = React.useState(false);

    React.useEffect(() => {
      setPreviousValue(initialValue)
    }, [initialValue])

    const onChange = // useRef(
      e => {
        let newValue = getNewValue(e);

        if (previousValue != newValue) {
          setValue(newValue);

          save({
            data: {id, field, value: newValue}, 
            onSuccess: () => {
              setSuccessfullyUpdated(true);
              setPreviousValue(newValue);

              setTimeout(() => {
                setSuccessfullyUpdated(false)
              }, STATUS_DURATION);
            },
            onFailure: () => {
              setUpdatedWithFailure(true);
              setValue(previousValue);

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