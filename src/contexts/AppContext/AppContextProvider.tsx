import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { HttpResponse } from '../../App';

interface AppContextProviderProps {
  children: ReactNode;
}

interface IContext {
  request: string;
  setRequest: Dispatch<SetStateAction<string>>;
  response: HttpResponse;
  setResponse: Dispatch<SetStateAction<HttpResponse>>;
}

export const AppContext = createContext<IContext>({
  request: '',
  setRequest: () => {},
  response: {
    kind: '',
    totalItems: 0,
    items: [],
  },
  setResponse: () => {},
});

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [request, setRequest] = useState(localStorage.getItem('request') || '');
  const [response, setResponse] = useState<HttpResponse>({
    kind: '',
    totalItems: 0,
    items: [],
  });

  const value = {
    request,
    setRequest,
    response,
    setResponse,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
