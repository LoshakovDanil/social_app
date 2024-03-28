import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppStateType, DispatchType } from '../redux-toolkit/store-redux'

export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
