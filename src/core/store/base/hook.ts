import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './rootStore';

// tipli dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// tipli selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
