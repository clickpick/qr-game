import useRequest from 'hooks/use-request';
import { activeProject } from 'api';

export default function useActiveProject() {
    const [{ data }, fetchProject] = useRequest(activeProject);

    return [data, fetchProject];
}