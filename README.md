super old school website that auto compiles JSON content and HTML partials into a non-optimized static website because that is literally all I want

## Setup
```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Run
Run the template compiler/watcher script inside the virtualenv:
```
source venv/bin/activate
./compile.sh
```

## Structure
- HTML partials live in `/templates`, and pages get compiled into the project root dir because there is no static routing god here to save you
- Most site content lives in `assets/*.json` and is bound to the templates. Loaded in dynamically, so no compilation is needed to update the content. World's lowest effort CMS!

## Todo
- [ ] I should probably make this layout mobile first at some point
