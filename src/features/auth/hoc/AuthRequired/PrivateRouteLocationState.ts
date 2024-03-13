export interface PrivateRouteLocationState {
  privateRoute?: string;
}

export function isPrivateRouteState(
  state: PrivateRouteLocationState
): state is PrivateRouteLocationState {
  return Boolean((state as PrivateRouteLocationState).privateRoute);
}
