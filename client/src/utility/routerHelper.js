import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

export function withParamsAndNavigation(Component) {
    return (props) => (
        <Component {...props} params={useParams()} navigate={useNavigate()} searchParams={useSearchParams()} />
    )
}
