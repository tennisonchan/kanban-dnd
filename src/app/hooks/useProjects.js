import { useDispatch, useSelector } from "react-redux";
import { projectSliceName, fetchProjects } from "app/slices/projects";

const getProjectState = (state) => state[projectSliceName];
export const getProjectList = (state) => getProjectState(state)?.projectList;

export function useProjects() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => getProjectList(state)) || [];

  return [
    { projectList },
    {
      fetchProjects: function () {
        return dispatch(fetchProjects());
      },
    },
  ];
}
