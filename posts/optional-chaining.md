---
title: Optional Chaining
description: Typescript 3.7 cool features
date: 2021-01-03
tags:
  - typescript
layout: layouts/post.njk
image: optional-chaining.PNG
---

-Enables to immediately return <code>undefined</code> in object chaining if a <code>null</code> or <code>undefined</code> is encountered. <code>`?.` </code> is the symbol to achieve this.

Example #1
 <!-- excerpt -->

``` typescript
    const customer :{
        customerId: number,
        firstName?: string,
        lastName?:string,sni
        } = { customerId: 4, FirstName: 'Daniel' };

        const firstName = customer?.firstName?.toUpperCase(); // Now we can  do the optional chaining
        console.log(firstName);
```

In the example above, `customer` is checked for `null` or `undefined`; and since it is not, `firstName` is checked for `null` or `undefined`, and since it is not, it will execute `toUpperCase()`. The console log in the above example will print out 'DANIEL'.

Now let's see the following example
Example #2

```typescript
const lastName = customer?.lastName?.toUpperCase();
console.log(lastName);
```

In this example, `customer` is checked for `null` or `undefined`. Since it is not, the execution of the chain will continue and check lastName for `null` or `undefined`. Here since lastName is not set, it is `undefined`, the optional chain will return immediately `undefined` without continuing the execution ( `toUpperCase()` will not be called) and the console output will be 'undefined'

### Now let's the coolness of this feature

The following codes are the equivalent of Example #1
Equivalent Code #1

```typescript
let firstName = undefined;
if (customer) {
  if (customer.firstName) {
    firstName = customer.firstName.toUpperCase();
  }
}
console.log(firstName);
```

Equivalent Code # 2

```typescript
const firstName =
  customer && customer.firstName && customer.firstName.toUpperCase();
```

How many places we use the `&&` to check `null` and `undefined`? so Generally speaking, we can replacing all such repetitive code with `&&`.

### <span style="color:red">CAUTION</span>

There is a difference between `&&` and `?.` and proceed with caution

`&&` evaluates falsy values such as `empty`, `0`, `false`, and `NaN`. However, if `?.` halts the chain and returns `undefined` if only encountered with `null` or `undefined`. It does not return or stop execution if encountered valid values such as `0` or `empty`

Example #3

```typescript
const fullName: { firstName: string; lastName?: string } = {
  firstName: "Alex",
  lastName: "",
};
// using `?.`
let defaultLastName = fullName?.lastName?.replace("", "Maru");
console.log(`LastName(?.): ${defaultLastName}`); // will print 'LastName: Maru'

//using &&
defaultLastName =
  fullName && fullName.lastName && fullName.lastName.replace("", "Bontu"); // string is immutable, so lastName is still empty
console.log(`LastName(&&):${defaultLastName}`); // will print undefined
```

From the above example, it is clear that `&&` and `?.` act differently on 'empty' values. This is intentional and just you need to be careful when replacing `&&` with `?.`

`?.` can also be used with array indexing, and function calls as well

Example #4 - Array accessing

```typescript
const oddNumbers = [3, 5, 9];
const firstValue = oddNumbers?.[0];
console.log(firstValue);
```

On `oddNumbers?.[0]`, `?.` checks if the array is null or empty, otherwise access the first element.

Example #5 - Function Calls

```typescript
function calculate(
  x: number,
  y: number,
  op?: (p: number, q: number) => number
): number | undefined {
  return op?.(x, y); //checks if op is not null or undefined,
}

let sum = calculate(4, 5, (x, y) => x + y); //sum will be 9

console.log(sum);
sum = calculate(4, 5); //sum will be 'undefined'
```

In Example #5, `op?.(x,y)` checks if the function parameter `op` is null or undefined, if not, it will execute the method call otherwise returns `undefined`

### <span style="color:red">WARNING</span>

`?.` only acts on object chaining and does not act on the entire statement of an expression. it means after it shortcircuits on `null` or `undefined` , it won't stop what follows the chaining.

Example #6

```typescript
const coordinates: { x: number; y: number; z?: number } = { x: 3, y: 5 };

const multiplied = coordinates?.z * 4; //error
```

In Example #6, `?.` returns `undefined` on evaluating `coordinates?.z` but does not stop the rest of the statement, thus the above code will result in compile time error 'Object is possibly 'undefined', saved by the awesomeness of typescript.

However, if you are concatening strings to create a message to a user, be careful since you might concatenate empty string with some other string and the result may not be as expected.

### Nullish Coalescing

`??` now has become to state a default fall back when `null` or `undefined` is encountered.

Example #7

```typescript

function execute(firstName: string, greeting?: string) {
    const defaultGreeting = "What's up!";
    return `${firstName}, ${greeting ?? defaultGreeting}`;
}

console.log(execute('Daniel'));
console.log(execute('Daniel', 'Good morning!');
```

In the code snippet above, the first console log results in 'Daniel, What's up!' and the second one results in 'Daniel, Good morning!'

### <span style="color:red">CAUTION</span>

`??` can be used to replace `||`. However, `||` acts on falsy values such as empty (`""`), `undefined`, `0`, `NaN`. `??` acts on `undefined` or `null`.

Example #7

```typescript
const defaultSpeedBy = 20;
const currentSpeed = 10;

let speedBy: number | undefined = undefined;

const newSpeedCorrect = currentSpeed + (speedBy || defaultSpeedBy); // 30

const newSpeedAlsoCorrect = currentSpeed + (speedBy ?? defaultSpeedBy); //30

//now
speedBy = 0;

const newSpeedWrong = currentSpeed + (speedBy || defaultSpeedBy); //30
const speedCorrect = currentSpeed + (speedBy ?? defaultSpeedBy); //10
```

In the example, when `speedBy` is `undefined` both `||` and `??` give correct results. However, when `speedBy` is set to 0, `||` 0 is falsy value and results in wrong result 30 (`newSpeedWrong`). To avoid such erros, you can use `??` (`speedCorrect`)

Kudos to optional chaining and nullish coalescing.
