import { ChangeEvent } from 'react';

export const onChangeInput = (
  e: ChangeEvent<HTMLInputElement>,
  key: string,
  state: { [key: string]: any },
  setState: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
) => {
  setState({
    ...state,
    [key]: e.target.value,
  });
};
