from jinja2 import Environment, PackageLoader
import os


BUILD_DIR = 'build'
TEMPLATES_DIR = 'templates'

env = Environment(loader=PackageLoader(__name__, TEMPLATES_DIR))
env.filters['static'] = lambda s: '/assets/' + s

pages = [s for s in os.listdir(TEMPLATES_DIR)
         if not s.startswith('_') and s.endswith('.html')]

for filename in pages:
  with open(os.path.join(BUILD_DIR, filename), 'w') as f:
    template = env.get_template(filename)
    variables = {
      'STATIC_DIR': '/assets/',
    }
    f.write(template.render(**variables))
    print "Compiled '%s/%s' to '%s/%s'" % (
      TEMPLATES_DIR, filename, BUILD_DIR, filename)
