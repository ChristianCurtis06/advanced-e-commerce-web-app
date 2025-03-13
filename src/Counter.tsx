import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { increment, decrement } from './redux/counterSlice';

const Counter = () => {
   const count = useSelector((state: RootState) => state.counter.count);
   const dispatch = useDispatch<AppDispatch>();

   return (
      <div>
         <h1>Count: {count}</h1>
         <button onClick={() => dispatch(increment())}>Increment</button>
         <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
   );
};

export default Counter;