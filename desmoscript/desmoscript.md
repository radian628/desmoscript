# Desmoscript brainstorming

infix notation for numbers.

Functions

## Callbacks: Limitations

Callbacks are partially doable, subject to limitations. The simplest case is either directly passing a function in inline or passing in a function by name. The only thing I can't do is assign a function to a variable. Well technically I can, 

## How the fuck do I create a type system

I need some kind of thing to represent a set of possible types. I can just use the union type I've created. I'll also favor generics of unions over unions of generics, because unions of generics could increase in number horrifically (generic functions and combinations of type parameters).

Alternatively, I can forgo callbacks entirely to cut myself loose from at least part of this mess. I should have a more robust system for handling metaprogramming anyway. Instead of this stupid callback horseshit, I'm going to have a system where you can plug values into a macro that are substituted at compile time. These will be so-called "hygenic" macros that automatically rename symbols inside of them.

Alright, I need some good way of adding a type system.

## How the fuck do I create scopes

One of the biggest innovations of desmoscript over LISPsmos is that of a scoping system. No longer is every variable haphazardly thrust into the global namespace! But how in the ever-loving fuck do I implement a scoping system?

I need a tree of hash tables: Every time I encounter a variable, function, macro, namespace, et cetera, I will set the corresponding key in the table. I'll also attach an "equivalent scope" to everything to aid in compilation. During compilation of an identifier, the program will search for identifiers, starting in its enclosing scope. If it doesn't find anything, it'll go outward scope by scope until it reaches the root scope. If it doesn't find anything there, it'll throw an error because the identifier was undeclared.

Yeah, fuck it, I'm just gonna mutate the scope object. How do I structure this? No wait, nevermind, I don't actually need to mutate the scope object. I'll just add an "equivalent scope" tag to every expression

## Macros: How the fuck?

So I'm thinking this thing will support several kinds of macros. The first is the fairly obvious "substitution" macros. Of course, these will also allow the substitution of identifiers (perhaps some kind of "lvalue" type). There will also be "external" macros that transform the AST via TypeScript (or JavaScript) code. These--- in addition to the above types--- will also be able to take in raw JSON (which, for the macros I make at least, will be parsed with Zod or some other such tool. I might make my own one which says *what* is wrong for better documentation purposes).

Okay but *how* do I implement macros? The easiest way to do this is to just have all macros exist in the TypeScript layer. Alternatively, since substitution macros could be quite useful, I should implement those.

Should macro substitution occur before or after semantic analysis? If it happens before, I can just continue scoping as normal. Screw it, I might try that. Problem is at that point I wouldn't know anything about the macro itself, so I might have some kind of "macro substitution pass" that takes place before scoping. The problem with that is that macros exist within scopes as well, so I might have no choice but to clone all the scoping information and the expressions.

How to handle macro instantiation: First of all, create a copy of the macro's root scope. This will entail a hell of a lot of pain and suffering because I also have to do the same for any of its subscopes. Fortunately, I think I have an easy-ish solution: I'll recreate a scope representing the macro body every time I instantiate it. Of course, this scope will be renamed to take into account the fact that there may be multiple macro instantiations in the same scope. I'll then insert that scope into the one in which the macro is instantiated.

## Time to create a type system soon?

I'm close to the point where I can start making a type system. Fuck this I'll think about it tomorrow I'll probably do something where you "register" types and then constrain types based on their usage.

Type System
1. Register a type using its name as a string (throw error if already exists)
2. Define all valid type combinations for each builtin operator, function, and macro.
3. Iteratively narrow down types.
    1. Go through the entire expression tree, narrowing types where feasible given the current information.
    2. Infer type of each expression based on its root.
    3. If no types have changed, type narrowing is done.
    4. Using this new expression information, go back to the beginning and repeat.






# Future Plans
Implement the following Desmos features using macros:
    - Sum
    - Product
    - Integral
    - Derivative

The most sensible way to do this is probably by passing in a function. On the other hand, however, I could probably get away with using identifiers and an expression that uses them in the last place. The macro will be substituted in the end anyway so the fact that are initially some unbound identifiers won't matter.

# More future plans:
Implement
- Sum, Product, and Integral (done)
- Derivative (done)
- Point access
- List index access

I may use backslash as the "accessor" because the dot is already taken by fucking namespacing. Seriously, fuck namespacing. Actually no, namespacing is cool. 

## "Import" Macros
Currently, the "import" feature can import a scope and either merge it with the current scope or put it into a subscope. I can do the same thing with macros that create their own scopes, merging them into the current scope or their own scope. Since I can just create namespaces, I may not even bother.

## how the fuck do I embed JSON into desmoscript
I'm probably just going to put everything in one file to simplify everything.

syntax brainstorm:

show y = x with @{
    lines: false,
    colorLatex: ds(rgb(255, 0, 0))
}

ticker a -> a + 1 with @{
    playing: false
}

settings @{
    graphpaperBounds: {
        xmin: 0,
        xmax: 5,
        ymin: 0,
        ymax: 5
    }
}

JSON is a bit more verbose than I'd ideally like, but it may have to do. I can probably drop the quotes in the key names. Hell, even the commas may not even be ambiguous. Whatever, I don't want to push my luck and find out I've been fucking myself over. I know at the very least that I can probably ditch the key quotes.

I'll also have this ds() "function" for handling desmoscript embedded within JSON.

