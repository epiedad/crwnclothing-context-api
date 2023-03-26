import {
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";
const withRouterWrapper = Component => {
  function ComponentWithRouterProp(props) {
    let navigate = useNavigate();
    let params = useParams();
    let location = useLocation();
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouterWrapper;