import React from "react";

export default function useStatus({ id, index, getNewValue, setValue, updateMyData }) {
    const [successfullyUpdated, setSuccessfullyUpdated] = React.useState(false);
    const [updatedWithFailure, setUpdatedWithFailure] = React.useState(false);

    const onChange = e => {
        let newValue = getNewValue(e);
    
        updateMyData(index, id, newValue, 
          () => {
            setSuccessfullyUpdated(true);
            setValue(newValue);    
    
            setTimeout(() => {
              setSuccessfullyUpdated(false)
            }, 2000);
          },
          () => {
            setUpdatedWithFailure(true);
            
            setTimeout(() => {
              setUpdatedWithFailure(false);
            }, 2000);
          }
        );
      }

      // <div style={{position: "relative"}}>
    let StatusMarkup = ({ children }) => (<>
        <div style={{position: "relative"}}>
            { children }
            { successfullyUpdated && <span className="position-absolute top-50 end-0 translate-middle bg-success border border-light rounded-circle" style={{marginRight: '-0.4em'}}><i className="fas fa-check" style={{color: 'white', padding: '0.2em', fontSize: '0.7em', display: 'block'}}></i></span> }
            { updatedWithFailure  && <span className="position-absolute top-50 end-0 translate-middle bg-danger border border-light rounded-circle" style={{marginRight: '-0.4em'}}><i className="fas fa-exclamation" style={{color: 'white', padding: '0.2em 0.5em', fontSize: '0.7em', display: 'block'}}></i></span> }
        </div>
    </>);
    
    return [StatusMarkup, onChange]
}