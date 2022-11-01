import { Dispatch, SetStateAction } from 'react';

/**
 * @name changeInputValue
 * @description input value를 수정하는 util 함수입니다. maxLength 파라미터를 추가한다면 최대글자 수를 정할 수 있습니다.
 * @params e: ChangeEvent
 * @params setState: input 상태 변경 함수
 * @params maxLength?: 최대 글자 수
 */

export const changeInputValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<string>>,
  maxLength?: number
) => {
  if (maxLength === undefined) setState(e.target.value);
  else if (maxLength !== undefined && e.target.value.length <= maxLength) {
    setState(e.target.value);
  }
};
