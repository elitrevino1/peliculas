''' from crypt import methods
from flask import Flask, render_template, request
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_marshmallow import Marshmallow
# from flask_cors import CORS
import loaf

app = Flask(__name__)

loaf.bake(
    host= "127.0.0.1",
    port = 3306,
    user = "root",
    pasw = "yugonpleisteodon",
    db = "peliculas_integrador"
)

@app.route("/", methods = ["POST", "GET"])
def home():
    return render_template("../../public/index.html")

# prueba = loaf.query("SELECT * FROM Pelicula");
# print(prueba)

if __name__ == "__main__":
    app.run(debug = True) '''