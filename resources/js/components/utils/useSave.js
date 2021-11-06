import React from 'react';

export default function useSave(inlineUpdateUrl, onBeforeSuccess) {
    /** dataObj = {id, field, value} **/
    const save =  ({dataObj, onSuccess, onFailure}) => {
        fetch(inlineUpdateUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(dataObj)  
        })
        // .then(response => response.json())
        .then(response => {
          if (typeof (response["Not success"]) !== "undefined" ) {
            // Failure
            onFailure();
          } else {
            // Success
            onBeforeSuccess(id - 1, field, value);
            // synchronizeDataOnUpdateSuccess(index, id, value);
            onSuccess();

            // Show toasted message
            // https://getbootstrap.com/docs/5.1/components/toasts/
            // console.log('saved ' + id + ' to ' + value + ' - ' + JSON.stringify(responseSavedSuccess));
          }
          })
          .catch((error) => {
            onFailure()
          });
      }

    return [save];
}
