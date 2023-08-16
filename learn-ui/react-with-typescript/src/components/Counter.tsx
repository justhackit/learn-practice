import React from 'react';
import { useState } from 'react';
import { Button } from '@cloudscape-design/components';

type Props = {
  initialValue: number;
};

const Counter: React.FC<Props> = (props: Props) => {
  const [count, setCount] = useState(props.initialValue);
  return (
    <>
      <p>Counter : {count}</p>
      <Button onClick={() => setCount(count + 1)}>+</Button>
      <Button onClick={() => setCount(count - 1)}>-</Button>
    </>
  );
};

export default Counter;
