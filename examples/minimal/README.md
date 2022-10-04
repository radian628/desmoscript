# How to get started with Desmoscript

This is a fairly minimal example of Desmoscript. Try it yourself by following these steps:
1. Install required NPM packages (including the `desmoscript` module):
```
npm install
```
2. Run the compiler. Due to Desmos being a web app, the compiler compiles the Desmoscript and then hosts it on a web server.
```
npm start
```
3. Go to Desmos and paste the following into the browser console. This will request the Desmos state from the Desmoscript web server and move it to the calculator:
```
Calc.setState(await (await fetch("http://localhost:8081")).text());
```


If you want to set up a Desmoscript environment yourself, do be aware that as of right now, there are a few conditions to its use, which are currently being resolved:
- You must be using ES Modules (not CommomJS)
- You must be using a JS module (`.mjs` extension or `type: "module"` in package.json)
- You must include the `--experimental-specifier-resolution=node` argument when running this in node.