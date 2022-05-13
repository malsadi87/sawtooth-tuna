import { useParams, useNavigate } from 'react-router-dom';

export function withParamsAndNavigation(Component) {
    return (props) => (
        <Component {...props} params={useParams()} navigate={useNavigate()} />
    )
}
