# Desmoscript

Desmoscript is a programming language that compiles to Desmos graph state. It is designed to provide the features of Desmos with zero overhead and with a C-like syntax. The syntax is largely inspired by JavaScript, Rust, and Desmos itself.

## Goals of Desmoscript
- **Highly performant**&mdash; doing things the idiomatic way should incur little-to-no performance overhead. If the idiomatic way is not performant, a performant alternative should be available.
- **Easy to both write and read**&mdash; C-like syntax is familiar to most programmers, and has an emphasis on compactness. 
- **Able to be effectively used in large projects**&mdash; A proper scoping system, namespacing, and file-splitting capabilities are used to help manage complexity in large projects.
- **Catch as many errors at compile-time as possible.**
- **Allow Desmos to interface with the outside world**&mdash; An extensible macro system should allow Desmoscript to import external data&mdash; for instance, Desmoscript macros could be used to add 3D models, SVG paths, or CSV data to a Desmos graph, automatically formatted as Desmos data.

## Features (non-exhaustive)
- arithmetic
- functions
- lists
- ranges
- points
- list comprehension
- namespaces
- piecewises
- multi-step expressions
- integrals and derivatives
- products and sums
- displayed expressions
- graph settings

## Example of (almost) all features
(See the compiled output of this graph here.)[https://www.desmos.com/calculator/uwggjgonyn]
https://github.com/radian628/desmoscript/blob/48e83b7fecc9fffa7d099c9d6198a1c6fb8ed2e6/testing/testfiles/showcase.desmo#L1-L85

## Additional Contributors
Big thanks to the following people for helping with this project:
- @Lenny-the-burger on GitHub.