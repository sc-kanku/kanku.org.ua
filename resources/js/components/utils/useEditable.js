import React from 'react';
import useSave from '../utils/useSave';
import useStatus from '../utils/useStatus';

// data: { id, field, value }
export default function useEditable({ data, getNewValue, inlineUpdateUrl, onBeforeSuccess, updateOnStart }) {
    onBeforeSuccess = typeof onBeforeSuccess == 'function' ? onBeforeSuccess : () => {};
    let noValue = typeof data.value == 'undefined';

    const [value, setValue] = React.useState(noValue ? null : data.value);
    const [save] = useSave(inlineUpdateUrl, onBeforeSuccess);
    const [Status, onChange] = useStatus({ data, save, setValue, getNewValue });

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
