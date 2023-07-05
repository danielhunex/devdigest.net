---
title: "Series: Exploring New Features in C# (Version 7 to 11): Article 1: New Features in C# 7"
date: 2023-07-04T03:00
thumb: "literal_improvement.png"
tags: 
    - CSharp
    - .NET
    - CSharp
---

In this series of article titled "Exploring New Features in C#",we will see the new features introduced in C# version of 7 to 11. Over the years,C# 7 introduced several exciting features and enhancements that improved the developer experience and made the language more powerful. In this article, we will explore three major features added in C# 7 along with code snippets demonstrating their usage.

<!-- excerpt -->

## Tuples
Before the introduction of tuples C# 7, developers often had to create custom classes or structures to represent a group of related values. For example, if you wanted to return multiple values from a method, you would have to define a new class or structure to encapsulate those values.
With the introduction of tuples in C# 7, you can now return multiple values from a method without the need to create custom classes or structures. Tuples provide a concise way to represent a group of values. You can declare a tuple using parentheses and specify the types of its elements. 

```c#
(string, int) GetPersonDetails()
{
    string name = "John Doe";
    int age = 30;
    return (name, age);
}

void Main()
{
    var person = GetPersonDetails();
    Console.WriteLine($"Name: {person.Item1}, Age: {person.Item2}");
}

```

In the above example, the `GetPersonDetails` method returns a tuple with two values: a string representing the name and an integer representing the age. The values are assigned to person, and you can access them using the Item1 and Item2 properties of the tuple

### Tuples Deconstruction

A deconstructing declaration is a syntax for splitting a tuple (or other value) into its parts and assigning those parts individually to fresh variables instead of using Item1, Item2, etc

```csharp
void Main()
{
    var (name,age) = GetPersonDetails();
    Console.WriteLine($"Name: {name}, Age: {age}");
}

```

## Pattern Matching

Before pattern matching was introduced in C# 7, developers often had to use a combination of conditional statements and type checking to determine the shape or structure of data and perform appropriate actions.

Pattern matching simplifies complex conditional statements by allowing you to match values against patterns. It enables you to perform actions based on the shape or structure of the data, improving readability and reducing code duplication.

```C#
void ProcessShape(Shape shape)
{
    if (shape is Circle circle)
    {
        Console.WriteLine($"Circle with radius {circle.Radius}");
    }
    else if (shape is Rectangle rectangle)
    {
        Console.WriteLine($"Rectangle with dimensions {rectangle.Width}x{rectangle.Height}");
    }
    else if (shape is null)
    {
        Console.WriteLine("No shape provided.");
    }
    else
    {
        Console.WriteLine("Unknown shape.");
    }
}

```

In the above example, the ``ProcessShape`` method accepts a `Shape` parameter. Using pattern matching, we can check the type of the shape and perform specific actions accordingly. If the shape is a `Circle`, then the object is assigned to the variable `circle`, and we can access its `Radius` via `circle.Radius` property. If it's a Rectangle, we can access its Width and Height properties. If no shape is provided or an unknown shape is passed, appropriate messages are displayed.

Switch statements with patterns provide a powerful way to perform different actions based on the patterns matched by the input value. You can use patterns such as type patterns, constant patterns, and more. Below is an example of type patterns in a switch statement

```csharp
void ProcessShape(Shape shape)
{
    switch (shape)
    {
        case Circle circle:
            Console.WriteLine($"Circle with radius {circle.Radius}");
            break;
        case Rectangle rectangle:
            Console.WriteLine($"Rectangle with dimensions {rectangle.Width}x{rectangle.Height}");
            break;
        case null:
            Console.WriteLine("No shape provided.");
            break;
        default:
            Console.WriteLine("Unknown shape.");
            break;
    }
}

```

## Inline Declaration of Out Variables

Before C# 7, when using the out keyword to return multiple values from a method, you had to declare the variables outside the method call. C# 7 introduced the ability to declare out variables inline when calling a method

```csharp

bool TryParseInt(string input, out int result)
{
    return int.TryParse(input, out result);
}

void Main()
{
    if (TryParseInt("123", out int value))
    {
        Console.WriteLine($"Parsed value: {value}");
    }
    else
    {
        Console.WriteLine("Invalid input");
    }
}

```

In the above example, the ```TryParseInt``` method attempts to parse a string as an integer and returns a boolean indicating the success of the parsing. In C# 7, you can declare the value variable inline in the method call itself, eliminating the need for an additional variable declaration.

## Ref Returns and Locals
C# 7 introduced the ability to return references to variables (ref returns) and store references in local variables (ref locals). This allows you to pass variables by reference and modify their values directly, without creating unnecessary copies.

```csharp
ref int FindLargestNumber(ref int[] numbers)
{
    int index = 0;
    for (int i = 1; i < numbers.Length; i++)
    {
        if (numbers[i] > numbers[index])
        {
            index = i;
        }
    }
    return ref numbers[index];
}

void Main()
{
    int[] nums = { 1, 5, 3, 8, 2 };
    ref int largest = ref FindLargestNumber(ref nums);
    largest = 10;
    Console.WriteLine($"Modified Largest Number: {nums[3]}");
}

```

In the above example, the ```FindLargestNumber``` method returns a reference to the largest number in an array of integers. By using ref in the method signature and returning ```ref numbers[index]```, we can directly modify the value of the largest number in the array as shown in the main method.

## Generalized Async Return Types
C# 7 introduced the ability to use generalized async return types, allowing methods to return any type that implements the Task or ValueTask pattern. This improves performance and reduces unnecessary allocations when working with asynchronous 

```csharp
async Task<int> GetResultAsync()
{
    await Task.Delay(1000);
    return 42;
}

void Main()
{
    var resultTask = GetResultAsync();
    // Do other work while waiting for the result
    int result = resultTask.GetAwaiter().GetResult();
    Console.WriteLine($"Result: {result}");
}

```

In the above example, the `GetResultAsync` method asynchronously delays for 1000 milliseconds and returns an integer value. With C# 7, the method signature can directly specify `Task<int>` as the return type, indicating that the method returns an asynchronous task that will eventually produce an integer result.

## More Expression-Bodied Members
C# 7 expanded the support for expression-bodied members, allowing you to use expression syntax instead of block syntax for more members, such as properties, methods, and constructors. This leads to more concise and readable code.

```csharp
class Person
{
    public string Name { get; }
    public int Age { get; }

    public Person(string name, int age) => (Name, Age) = (name, age);

    public string GetInfo() => $"Name: {Name}, Age: {Age}";
}

void Main()
{
    var person = new Person("John Doe", 30);
    Console.WriteLine(person.GetInfo());
}

```

In the above example, the `Person` class demonstrates the usage of expression-bodied members. The constructor and the `GetInfo` method are defined using the expression syntax, reducing the code verbosity and making it more concise.

## Throw Expressions

C# 7 introduced throw expressions, allowing you to throw exceptions as part of an expression. This simplifies error handling and eliminates the need for separate statements to throw exceptions.

```csharp
int Divide(int x, int y)
{
    if (y == 0)
        throw new DivideByZeroException();
    return x / y;
}

void Main()
{
    int a = 10, b = 0;
    int result = (b != 0) ? Divide(a, b) : throw new ArgumentException("Divisor cannot be zero.");
    Console.WriteLine($"Result: {result}");
}

```
In the above example, the ```Divide``` method checks if the divisor (y) is zero. If it is, a ```DivideByZeroException``` is thrown using the throw expression. Otherwise, the division is performed. This allows for concise and expressive error handling within expressions.

## Literal Improvements
C# 7 introduced several improvements to literals, making them more flexible and easier to use. Some examples include binary literals, digit separators, and more.

```csharp
int binaryLiteral = 0b101010;
long longLiteral = 123_456_789_012;
double number = 3.14_15_92;
string formattedNumber = $"{number:N2}";
Console.WriteLine($"Binary Literal: {binaryLiteral}");
Console.WriteLine($"Long Literal: {longLiteral}");
Console.WriteLine($"Formatted Number: {formattedNumber}");

```

In the above example, we demonstrate the usage of binary literals (0b prefix), digit separators (underscore _), and string interpolation with a numeric format specifier (N2 for two decimal places). These improvements make literals more expressive and easier to read.

## Local Functions

Before local functions were introduced in C# 7, developers often had to create separate private methods outside the current method to encapsulate helper logic. This could lead to cluttered code and reduced code readability.

C# 7 introduced local functions, which are methods defined inside another method. Local functions improve code organization and encapsulation by allowing you to define helper functions that are only used within a specific context.

```csharp
void ProcessData(int[] data)
{
    // Local function to calculate the sum of an array
    int CalculateSum()
    {
        int sum = 0;
        foreach (int num in data)
        {
            sum += num;
        }
        return sum;
    }

    int sum = CalculateSum();
    Console.WriteLine($"Sum of the array: {sum}");
}
```

In the above example, the ` ProcessData ` method takes an array of integers as input. Inside the method, we define a local function called CalculateSum that calculates the sum of the array elements. The local function can access the data parameter and perform the necessary calculations. Finally, the sum is printed to the console.

## Conclusion
C# 7 introduced several powerful features such as tuples, pattern matching, and local functions that enhanced the language's capabilities. These features simplified common programming tasks and made the code more concise and readable. With tuples, you can easily return multiple values without creating custom classes. Pattern matching allows you to simplify conditional statements based on the shape or structure of data. Local functions improve code organization and encapsulation by defining helper functions within a specific context. Stay tuned for the next article in the series, where we will explore the new features added in C# 8.