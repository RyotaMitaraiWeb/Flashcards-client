import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideModal } from '../app/slices/mobileMenu';


export function useCloseMenu() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(hideModal());
    }, [dispatch])
}
