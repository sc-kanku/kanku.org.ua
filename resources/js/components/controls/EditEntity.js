import EditAthlete from './../panes/EditAthlete';
import EditDojo from './../panes/EditDojo';
import EditPost from './../panes/EditPost';

export default function EditEntity({name, getUrl, updateUrl}) {

    if (name == "athlete") {
        return <EditAthlete getUrl={getUrl} updateUrl={updateUrl} />
    }

    if (name == "dojo") {
        return <EditDojo getUrl={getUrl} updateUrl={updateUrl} />
    }

    if (name == "post") {
        return <EditPost getUrl={getUrl} updateUrl={updateUrl} />
    }
}
