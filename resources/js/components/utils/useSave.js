import React from 'react';

export default function useSave(inlineUpdateUrl, onBeforeSuccess) {
    /** data = {id, field, value} **/
    const save =  ({data, onSuccess, onFailure}) => {
        fetch(inlineUpdateUrl, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
          if (typeof (response['Unsuccessful']) !== 'undefined' ) {
            // Failure
            if (typeof onFailure == 'function') {
              onFailure(response['Unsuccessful']);
            }
          } else {
            // Success
            if (typeof onBeforeSuccess == 'function') {
                data.response = response;
                onBeforeSuccess(data);
            }

            // synchronizeDataOnUpdateSuccess(index, id, value);
            if (typeof onSuccess == 'function') {
              onSuccess(response['Successful']);
            }

            // Show toasted message
            // https://getbootstrap.com/docs/5.1/components/toasts/
            // console.log('saved ' + id + ' to ' + value + ' - ' + JSON.stringify(responseSavedSuccess));
          }
          })
          .catch((error) => {
            if (typeof onFailure == 'function') {
              onFailure(error);
            }
          });
      }

    return [save];
}
