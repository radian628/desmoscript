# Desmoscript

Desmoscript is a programming language that compiles to Desmos graph state. It is designed to provide the features of Desmos with zero overhead and with a C-like syntax, largely inspired by JavaScript, Rust, and Desmos itself.

## Goals of Desmoscript
- Highly performant&mdash; doing things the idiomatic way should incur little-to-no performance overhead.
- Easy to both write and read&mdash; C-like syntax is familiar to most programmers, and has an emphasis on compactness. A proper scoping system, namespacing, and file-splitting capabilities are used to further help manage complexity.
- Catch as many errors at compile-time as possible.
- Allow Desmos to interface with the outside world&mdash; An extensible macro system allows Desmoscript to import external data&mdash; for instance, Desmoscript macros could be used to add 3D models, SVG paths, or CSV data to a Desmos graph, automatically formatted as Desmos data.

