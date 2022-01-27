import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "app/slices/projects";
import { selectProjectList } from "app/selectors";

export function useProjects() {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => selectProjectList(state)) || [];

  return [
    { projectList },
    {
      fetchProjects: function () {
        return dispatch(fetchProjects());
      },
    },
  ];
}
