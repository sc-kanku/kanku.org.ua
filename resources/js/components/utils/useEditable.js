import React from 'react';
import useSave from '../utils/useSave';
import useStatus from '../utils/useStatus';

/**
 * @param {*} data
 * @param {*} getNewValue
 * @param {*} inlineUpdateUrl - endpoint where data shold be sent to be saved
 * @param {*} onBeforeSuccess -
 * @param {*} updateOnStart
 * @returns
 */
export default function useEditable({ data, getNewValue, inlineUpdateUrl, onBeforeSuccess, updateOnStart, onBeforeSave }) {
    onBeforeSuccess = typeof onBeforeSuccess == 'function' ? onBeforeSuccess : () => {};
    let noValue = typeof data.value == 'undefined';

    const [value, setValue] = React.useState(noValue ? null : data.value);
    const [save] = useSave(inlineUpdateUrl, onBeforeSuccess);
    const [Status, onChange] = useStatus({ data, save, setValue, getNewValue, onBeforeSave });

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(data.value)
    }, [ noValue ? null : data.value ])

    // if (typeof updateOnStart != 'undefined') {
    //     console.log('updateOnStart', updateOnStart);
    // }

    if (updateOnStart == true) {
        // console.log('updateOnStart is true calling onChange');

        onChange({forceSave: true});
    }

    const Editable = ({ children }) => <>
        <Status />
        { children }
      </>

    return [Editable, value, onChange, setValue];
}
