import React from 'react';

export default function useSave(inlineUpdateUrl, onBeforeSuccess) {
    /** data = {id, field, value} **/
    const save =  ({data, onSuccess, onFailure}) => {
        fetch(inlineUpdateUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)  
        })
        // .then(response => response.json())
        .then(response => {
          if (typeof (response["Not success"]) !== "undefined" ) {
            // Failure
            if (typeof onFailure == 'function') {
              onFailure();
            }
          } else {
            // Success
            if (typeof onBeforeSuccess == 'function') {
              onBeforeSuccess(id - 1, field, value);
            }

            // synchronizeDataOnUpdateSuccess(index, id, value);
            if (typeof onSuccess == 'function') {
              onSuccess();
            }

            // Show toasted message
            // https://getbootstrap.com/docs/5.1/components/toasts/
            // console.log('saved ' + id + ' to ' + value + ' - ' + JSON.stringify(responseSavedSuccess));
          }
          })
          .catch((error) => {
            if (typeof onFailure == 'function') {
              onFailure()
            }
          });
      }

    return [save];
}
