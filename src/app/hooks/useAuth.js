import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "app/slices/projects";
import { selectAccessToken } from "app/selectors";
import { authUser } from "app/slices/user";
import { useConnectedWallet } from "@terra-money/wallet-provider";

export const useAuth = () => {
  const dispatch = useDispatch();
  const connectedWallet = useConnectedWallet();
  const accessToken = useSelector(selectAccessToken);
  const { terraAddress = null } = connectedWallet || {};
  const isAuthenticated = !!accessToken;

  console.log({ terraAddress, isAuthenticated, accessToken });

  return [
    {
      accessToken,
      isAuthenticated,
    },
    {
      authUser: function (terraAddress) {
        return dispatch(authUser({ terraAddress }));
      },
      setAccessToken: function (accessToken) {
        dispatch(projectActions.setAccessToken({ accessToken }));
      },
    },
  ];
};
