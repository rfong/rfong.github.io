super old school because I literally just want to compile an HTML template that is all I want

```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run the template compiler/watcher script:

```
./compile.sh
```
HTML partials live in `/templates`, and pages get compiled into the project root dir because there is no static routing god here to save you

Most site content lives in `assets/*.json` and is bound to the templates. Loaded in dynamically, so no compilation is needed to update the content. World's lowest effort CMS!
