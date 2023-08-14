import type { Component } from "solid-js";
import Comp from "./Comp";
import "./index.less";
import { DesmosGraph } from "./DesmosGraph";
import { DesmoscriptExample, ExampleFromFile } from "./Example";
import { AutoHierarchicalNav } from "./AutoHierarchicalNav";

const ExampleFromAssets = ExampleFromFile("../assets/examples/");

const App: Component = () => {
  let navInner: HTMLDivElement;

  return (
    <>
      <nav>
        <div
          class="nav-inner"
          ref={(el) => {
            navInner = el;
          }}
        >
          <AutoHierarchicalNav
            scope={document.body}
            scrollNav={(amount) => {
              navInner.scrollTop = amount - navInner.clientHeight / 2;
            }}
          ></AutoHierarchicalNav>
        </div>
      </nav>
      <main>
        <h1 id="desmoscript-docs">Desmoscript Docs</h1>
        <h2 id="basics">Basics</h2>
        <p>These are the docs for the Desmoscript programming language.</p>
        <h3 id="minimal-example">Minimal Example</h3>
        <ExampleFromAssets>first</ExampleFromAssets>
        <h3 id="functions">Functions</h3>
        <p>
          In Desmoscript, there is no <code>return</code> keyword. An expression
          is inferred to be a function's return value if it is the last
          expression in the function body. Unlike normal statements and
          expressions, this last expression should <em>not</em> end with a
          semicolon.
        </p>
        <ExampleFromAssets>functions</ExampleFromAssets>
        <h3 id="text-notes-comments">Notes (AKA Text or Comments)</h3>
        <p>
          You can create text expression in Desmos (and comment your code, too)
          by creating notes, which can simply be made by enclosing text in
          quotes.
        </p>
        <ExampleFromAssets>notes</ExampleFromAssets>
        <h3 id="settings">Settings</h3>
        <p>
          Change the graph settings with the <code>settings</code> keyword
          followed by a JSON literal (denoted by <code>@{"{}"}</code>). This
          follows almost exactly the same format as the <code>graph</code>{" "}
          property of the value returned by <code>Calc.getState()</code> in the
          developer console.
        </p>
        <ExampleFromAssets>settings</ExampleFromAssets>

        <h2 id="data-types">Data Types</h2>
        <h3 id="points">Points</h3>
        <p>
          Points are notated in a manner identical to how Desmos notates them.
        </p>
        <ExampleFromAssets>points</ExampleFromAssets>
        <h3 id="lists">Lists</h3>
        <p>
          Lists are notated similar to how they're notated in Desmos, except for
          ranges, Desmoscript uses <code>..</code> (two dots, not three).
        </p>
        <ExampleFromAssets>lists</ExampleFromAssets>
        <h4 id="listcomps">List Comprehensions (Listcomps)</h4>
        <p>List comprehensions use a syntax very similar to Desmos's.</p>
        <ExampleFromAssets>listcomps</ExampleFromAssets>
        <h3 id="colors">Colors</h3>
        <p>
          Colors are generated as normal. Use the <code>colorLatex</code>{" "}
          property to use computed colors. For more on how to display things,
          visit <a href="#display">this section</a>.
        </p>
        <ExampleFromAssets>colors</ExampleFromAssets>
        <h3 id="polygons">Polygons</h3>
        <ExampleFromAssets>polygons</ExampleFromAssets>

        <h2 id="control-flow">Control Flow and Lifecycle</h2>
        <h3 id="piecewise">Piecewise</h3>
        <p>
          This is the syntax for piecewise functions, which are the Desmos
          equivalent of if-statements.
        </p>
        <ExampleFromAssets>piecewise</ExampleFromAssets>
        <h3 id="actions">Actions</h3>
        <p>
          Actions are an "escape hatch" from Desmos's normal lifecycle that
          allow mutations to variables to occur where they normally shouldn't
          happen. They are a powerful tool for implementing recursive
          operations, game loops, and other such "loop"-y structures that normal
          Desmos isn't particularly suited to. However, they should be used
          sparingly, as they can make projects harder to reason about and tend
          to be slower than simply updating a variable normally.
        </p>
        <ExampleFromAssets>actions</ExampleFromAssets>
        <h4 id="cond-actions">Conditional Actions</h4>
        <p>
          Actions can be placed in piecewises, allowing them to be updated
          conditionally.
        </p>
        <ExampleFromAssets>cond-actions</ExampleFromAssets>
        <h2 id="display">Display</h2>
        <p>
          You can display expressions by appending them with a JSON-like data
          structure, like the example below. This JSON-like data structure
          follows the same format as the one you would get from{" "}
          <code>Calc.getState().expressions.list</code>.
        </p>
        <p>
          Note that one of the properties being set here (<code>lineWidth</code>
          ) is being set to <code>ds(25)</code>, not just <code>25</code>. This
          is done because <code>lineWidth</code> can be any desmoscript
          expression, not just a constant number. In general, the{" "}
          <code>ds()</code> keyword allows you to insert desmoscript into
          expression properties.{" "}
          <em>
            Keep this in mind while setting properties that you'd expect to be
            numbers, because they're often actually strings under-the-hood to
            support arbitrary Desmos expressions.
          </em>
        </p>
        <ExampleFromAssets>show</ExampleFromAssets>

        <h2 id="macros">Macros</h2>
        <h3 id="subst-macros">Substitution Macros</h3>
        <p>
          Use the <code>subst!()</code> macro to create substitution macros.
        </p>
        <ExampleFromAssets>subst</ExampleFromAssets>
        <h3 id="js-macros">JS Macros</h3>
        <p>
          You can also directly call JavaScript code from desmoscript, allowing
          you to create macros that run arbitrary JavaScript, including
          operations such as file I/O.{" "}
          <a href="https://github.com/radian628/desmoscript/tree/main/examples/suzanne">
            See here for an example.
          </a>
        </p>
      </main>
    </>
  );
};

export default App;
