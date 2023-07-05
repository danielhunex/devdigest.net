---
title: "Series: Exploring New Features in C# (Version 7 to 11): Article 2: New Features in C# 8"
date: 2023-07-04T08:00
thumb: "deconstruct-properties.png"
tags: 
    - CSharp
    - .NET
    - CSharp
---

C# 8 has brought forth a set of exciting new features and enhancements that empower developers to write more concise, expressive, and efficient code. Released in 2019, C# 8 introduces several language enhancements, including nullable reference types, switch expressions, asynchronous streams, and more. These additions enhance the productivity and readability of C# code, while also improving the overall development experience. In this article, we will explore the key features introduced in C# 8, highlighting their significance and demonstrating how they can elevate your programming skills and the quality of your applications. 
<!-- excerpt -->


## Readonly Members

In C# 8, the introduction of readonly members brings more flexibility and immutability to the language. This feature allows you to declare fields, properties, and indexers as readonly, ensuring that their values cannot be modified after initialization. Let's delve into the details and see how readonly members can enhance your code.

```csharp
using System;

public class Circle
{
    public readonly double Radius;

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

class Program
{
    static void Main()
    {
        var circle = new Circle(5);
        double area = circle.CalculateArea();
        Console.WriteLine($"Area: {area}");
    }
}

```

In the code example above, we define a ```Circle``` class with a readonly field Radius. The ```readonly``` keyword ensures that the value of ```Radius``` cannot be modified after it is assigned in the constructor. We then have a ```CalculateArea``` method that calculates the area of the circle using the Radius field. In the Main method, we create an instance of Circle with a radius of 5 and calculate its area, which is then printed to the console.

# Default Interface Methods

C# 8 introduces default interface methods, allowing interfaces to have method implementations. This feature enables you to extend existing interfaces without breaking implementations that rely on them. Let's explore how default interface methods work and how they can benefit your codebase.

```csharp
using System;

public interface ILogger
{
    void Log(string message);

    public void LogError(string error)
    {
        Log($"ERROR: {error}");
    }
}

public class ConsoleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}

class Program
{
    static void Main()
    {
        ILogger logger = new ConsoleLogger();
        logger.Log("Information message");
        logger.LogError("Critical error");
    }
}

```

In the code example above, we define an ```ILogger``` interface with a ```Log``` method and a default method implementation called ```LogError```. The ```LogError``` method implementation is provided inside the interface itself using the public and default keywords. We then have a ```ConsoleLogger``` class that implements the ```ILogger``` interface and provides the required implementation for the Log method. In the Main method, we create an instance of ```ConsoleLogger``` and use it to call both the ```Log``` and ```LogError``` methods, which write messages to the console.

## Pattern Matching Enhancements

C# 8 introduces several enhancements to pattern matching, making it more powerful and expressive. With features like switch expressions, property patterns, tuple patterns, and positional patterns, you can handle complex data structures and simplify your code. Let's explore these enhancements and learn how they can improve your programming experience.

### Switch Expressions

```csharp
using System;

public enum ShapeType { Circle, Rectangle, Triangle }

public class Circle
{
    public double Radius { get; }

    public Circle(double radius)
    {
        Radius = radius;
    }
}

public class Rectangle
{
    public double Length { get; }
    public double Width { get; }

    public Rectangle(double length, double width)
    {
        Length = length;
        Width = width;
    }
}

public class Triangle
{
    public double Base { get; }
    public double Height { get; }

    public Triangle(double @base, double height)
    {
        Base = @base;
        Height = height;
    }
}

class Program
{
    static double CalculateArea(object shape)
    {
        return shape switch
        {
            Circle c => Math.PI * c.Radius * c.Radius,
            Rectangle r => r.Length * r.Width,
            Triangle t => (t.Base * t.Height) / 2,
            _ => throw new ArgumentException("Unknown shape"),
        };
    }

    static void Main()
    {
        var circle = new Circle(radius: 5);
        double area = CalculateArea(circle);
        Console.WriteLine($"Area of Circle: {area}");

        var rectangle = new Rectangle(length: 3, width: 4);
        area = CalculateArea(rectangle);
        Console.WriteLine($"Area of Rectangle: {area}");
    }
}

```

In the code example above, we define three classes: ```Circle```, ```Rectangle```, and ```Triangle```, representing different shapes. The ```CalculateArea``` method takes an object parameter shape and uses a switch expression to match the type of shape and calculate the corresponding area. The switch statement matches the shape type and assigns it to a variable (c, r, or t), allowing us to access specific properties of each shape and calculate the area accordingly. In the ```Main``` method, we create instances of ```Circle``` and ```Rectangle``` and calculate their respective areas using the ```CalculateArea``` method, which are then printed to the console.

### Property Patterns

```csharp  

using System;

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

class Program
{
    static void Main()
    {
        var person = new Person { Name = "John", Age = 30 };
        string message = GetPersonDescription(person);
        Console.WriteLine(message);
    }

    static string GetPersonDescription(Person person)
    {
        return person switch
        {
            { Age: 0 } => "Newborn",
            { Age: <= 12 } => "Child",
            { Age: >= 13 and <= 19 } => "Teenager",
            { Age: >= 20 } => "Adult",
            _ => "Unknown",
        };
    }
}


```

In the code example above, we have a ```Person``` class with ```Name``` and ```Age``` properties. The ```GetPersonDescription``` method takes a ```Person``` object and uses a ```switch``` expression with property patterns to match the age of the person and return a corresponding description. The property pattern ```{ Age: 0 }``` matches a newborn, ```{ Age: <= 12 }``` matches a child, ```{ Age: >= 13 and <= 19 }``` matches a teenager, ```{ Age: >= 20 }``` matches an adult, and _ matches any other age. In the ```Main``` method, we create a ```Person``` object with a name "John" and an age of 30, and then call the ```GetPersonDescription``` method to get the description based on the person's age, which is printed to the console.

### Tuple Patterns

```csharp
using System;

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public void Deconstruct(out string firstName, out string lastName)=>(firstName, secondName) = (FirstName, SecondName);  
}

class Program
{
    static void Main()
    {
        var person = new Person { FirstName = "John", LastName = "Doe" };
        string message = GetGreeting(person);
        Console.WriteLine(message);
    }

    static string GetGreeting(Person person)
    {
        return person switch
        {
            var (firstName, lastName) when firstName == "John" && lastName == "Doe" => "Hello, John Doe!",
            var (firstName, lastName) => $"Hello, {firstName} {lastName}!",
            _ => "Greetings!",
        };
    }
}

```

 The ```Deconstruct``` method allows the object to be deconstructed into its individual properties (FirstName and LastName) for use in tuple patterns.

The switch expression with tuple patterns will deconstruct the ```Person``` object into ```firstName``` and ```lastName``` variables and perform the matching based on their values. If the ```FirstName``` is "John" and the LastName is "Doe," it will return a personalized greeting. Otherwise, it will return a generic greeting with the person's first and last name. If the ```Person``` object doesn't match any specific tuple pattern, it will return a default "Greetings!" message.

In the ```Main``` method, we create a ```Person``` object with the first name "John" and the last name "Doe" and call the ```GetGreeting``` method, which will print a personalized greeting for John Doe to the console.


### Positional Patterns

```csharp

public class Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y)=>(X,Y) = (x,y);   
	
	public void Deconstruct(out int x, out int y)=>(x,y)=(X,Y);

}

class Program
{
    static void Main()
    {
        var point = new Point(5, 10);
        string location = GetLocation(point);
        Console.WriteLine(location);
    }

    static string GetLocation(Point point)
    {
        return point switch
        {
            var (x, y) when x == 0 && y == 0 => "Origin",
            var (x, y) when x > 0 && y > 0 => "Quadrant 1",
            var (x, y) when x < 0 && y > 0 => "Quadrant 2",
            var (x, y) when x < 0 && y < 0 => "Quadrant 3",
            var (x, y) when x > 0 && y < 0 => "Quadrant 4",
            _ => "Unknown",
        };
    }
}

```
In the code example above, we have a ```Point``` class with X and Y properties representing coordinates on a 2D plane and a ```Deconstruct``` method. The ```GetLocation``` method takes a ```Point``` object and uses a switch expression with positional patterns and a when clause to determine the location of the point in relation to the coordinate system. We check the position of the point based on its X and Y values and return the corresponding location (Origin, Quadrant 1, Quadrant 2, Quadrant 3, or Quadrant 4). If the point doesn't match any specific positional pattern, it will return "Unknown." In the ```Main``` method, we create a ```Point``` object with coordinates (5, 10) and call the ```GetLocation``` method, which will print the location of the point to the console.

## Using Declarations

In C# 8, a new feature called "using declarations" is introduced, which simplifies the management of disposable resources. This feature allows you to declare and initialize a disposable object within a using statement directly in the scope where it's needed, reducing code verbosity and improving readability. Let's explore how using declarations work with a practical example.



```csharp
using System;

class Program
{
    static void Main()
    {
        using var file = new System.IO.StreamWriter("sample.txt");
        file.WriteLine("Hello, using declarations!");
    }
}

```

Inside the ```using``` block, we write a line of text to the file using the ```WriteLine``` method. Once the execution exits the ```using``` block, the ```Dispose``` method of the ```StreamWriter``` object is automatically called, releasing any acquired resources.

## Nullable Reference Types:

Nullable Reference Types in C# 8 allow developers to make the nullability of reference types explicit. This feature helps eliminate null reference exceptions and increases code safety as in the simple example below

```csharp

string? nullableString = null;

if (nullableString != null)
{
    int length = nullableString.Length; // No warning due to null check
}

int nonNullableLength = nullableString.Length; // Warning: Possible null reference exception

```

In the above example, the nullableString variable is marked with ?, indicating that it can be assigned a null value. C# 8's compiler will analyze the code and emit warnings if there's a potential null reference exception.

## Ranges and Indices:
C# 8 introduces the Range and Index types, which simplify working with subsets of arrays and collections. Here are examples that demonstrates their usage:

```csharp
string[] names = { "Alice", "Bob", "Charlie", "Dave" };
Console.WriteLine(string.Join(", ", names[1..^1])); // Output: Bob, Charlie

```

In the above example, we use the .. syntax to create a range that includes all elements from index 1 to the second-to-last element (^1 denotes the last element from the end). The Join method concatenates the selected elements and outputs the result.

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

int[] subset = numbers[2..6]; // Select elements from index 2 to 5

Console.WriteLine(string.Join(", ", subset)); // Output: 3, 4, 5, 6

```

In this example, the range 2..6 selects elements from index 2 to 5 (inclusive) from the numbers array, creating a subset.

```csharp

int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
int n = 3;

int[] lastN = numbers[^n..]; // Select the last n elements from the array

Console.WriteLine(string.Join(", ", lastN)); // Output: 8, 9, 10

```

In this example, the range ^n.. selects the last n elements from the numbers array, where n is the desired number of elements to extract.

The ```Range``` keyword is used to create a range object, which represents a range of values within a sequence. It can be used in conjunction with the indexing operator ([]) to extract a subset of elements from an array, list, or any other collection that supports indexing. Here's an example showcasing the usage of the Range keyword:

```csharp

int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
Range range = 2..6; // Create a range object from index 2 to 5
int[] subset = numbers[range]; // Select elements using the range object
Console.WriteLine(string.Join(", ", subset)); // Output: 3, 4, 5, 6

```

## Asynchronous Streams
C# 8 introduced the powerful feature of asynchronous streams, allowing developers to consume and produce data asynchronously with ease. Asynchronous streams combine the benefits of asynchronous programming and stream-like data processing, providing a convenient and efficient way to work with asynchronous data streams. A simple example is below
```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        await foreach (int number in GenerateRandomNumbersAsync(5))
        {
            Console.WriteLine(number);
        }
    }

    static async IAsyncEnumerable<int> GenerateRandomNumbersAsync(int count)
    {
        Random random = new Random();

        for (int i = 0; i < count; i++)
        {
            await Task.Delay(500);
            yield return random.Next(1, 100);
        }
    }
}


```

In this example, the ```GenerateRandomNumbersAsync``` method returns an ```IAsyncEnumerable<int>``` object, which represents an asynchronous stream of integers. 

## Conclusion
C# 8 introduces a range of exciting features that enhance developer productivity and code quality. Nullable reference types provide better safety against null reference exceptions, switch expressions simplify conditional logic, ranges and indices make working with subsets of collections more convenient, and asynchronous streams enable efficient asynchronous data consumption. By leveraging these features, developers can write