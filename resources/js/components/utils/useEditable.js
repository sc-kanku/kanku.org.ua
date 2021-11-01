import React from 'react';
import useSave from '../utils/useSave';
import useStatus from '../utils/useStatus';

export default function useEditable({ id, field, initialValue, getNewValue, inlineUpdateUrl, onBeforeSuccess }) {
    onBeforeSuccess = typeof onBeforeSuccess == 'function' ? onBeforeSuccess : () => {};

    const [value, setValue] = React.useState(initialValue);
    const [save] = useSave(inlineUpdateUrl, onBeforeSuccess);
    const [Status, onChange] = useStatus({ id, field, initialValue, save, setValue, getNewValue });

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
      }, [initialValue])

    const Editable = ({ children }) => <>
        <Status />
        { children }
      </>

    return [Editable, value, onChange, setValue];
}
