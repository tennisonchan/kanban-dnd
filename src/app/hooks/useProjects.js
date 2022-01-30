import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, createProject } from "app/slices/projects";
import { selectProjectList } from "app/selectors";

export function useProjects() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => selectProjectList(state)) || [];

  return [
    { projectList },
    {
      createProject: function (project) {
        return dispatch(createProject({ ...project }));
      },
      fetchProjects: function () {
        return dispatch(fetchProjects());
      },
    },
  ];
}
