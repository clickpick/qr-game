import { useState, useEffect } from 'react';
import { activeProject } from 'api';

export default function useActiveProject() {
    const [project, setProject] = useState(null);

    function fetchProject() {
        activeProject()
            .then(({ data }) => {
                setProject(data);
            })
            .catch((e) => {
                setProject(false);
                console.log('active project', e);
            });
    }

    useEffect(fetchProject, []);

    return [project, fetchProject, setProject];
}