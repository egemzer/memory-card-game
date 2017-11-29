
import webapp2
import jinja2
import os
import sys;
reload(sys);
sys.setdefaultencoding("utf8")


env = jinja2.Environment(
  loader=jinja2.FileSystemLoader([os.path.dirname(__file__)]))


class MainPage(webapp2.RequestHandler):

  def get(self):
    context = {}
    tmpl = env.get_template("index.html")
    self.response.write(tmpl.render(**context))


app = webapp2.WSGIApplication(
  [
      ("/", MainPage),
  ], debug=True)
