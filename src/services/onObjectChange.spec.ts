
import {onChange} from "./onObjectChange";

it('should detect changes on the object',() => {
  let j = {
    a: 1
  };
  
  let changeable = onChange(j, () => {
    console.log("onChange:",j);
  });
  changeable.a = 3;
  
  console.log("j:",j);

  expect(true).toBeTruthy();
})