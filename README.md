# node-boilerplate
## Directory structure:
```
|
|- src/                   - sources folder
|---- bin/
|------- www              - entry point. main executable
|---- lib/                - common libraries
|---- models/             - DB models
|---- routes/             - site routes
|- node_modules/          - third-party back-end modules
|- public/                - site public files
|---- bower_components/   - third-party front-end modules
|---- css/                - css-files
|---- fonts/              - custom fonts
|---- images/             - site images
|---- js/                 - front-end JavaScript files
|- test/                  - unit-tests for some libraries
|- views/                 - site templates
```

## Generation:
### Models:
```
gulp generate:model --name post --force
```
This command creates new file `Post.js` in `src/models` folder and 
append `export {default as Post} from './Post';` line to `src/models/index.js` file.

### Routes:
```
gulp generate:router --name posts --force
```
This command creates new file `posts.js` in `src/routes` folder and 
add 2 lines to `src/routes/index.js` file:
- `import posts from './posts';`
- `router.use('/posts', posts);`
