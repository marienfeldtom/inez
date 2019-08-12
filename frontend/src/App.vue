<template>
  <div style="height: vh">
    <nav class="navbar navbar-expand-md navbar-dark bg-light">
      <a class="navbar-brand" href="#">
        <img
          src="./assets/logo.png"
          style="height: 80px; width: auto; margin-top: 10px; margin-left: 30px;"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a href="#">
              <i class="fas fa-list-ul"></i>Einkaufsliste
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <i class="fas fa-map-pin"></i> Edeka Finder
            </a>
          </li>
        </ul>
        <!--  <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>-->
      </div>
    </nav>

    <div class="container" id="cont">
      <h1>Einkaufsliste:</h1>
      <div class="form-group">
        <input
          type="name"
          v-model="data"
          @keyup="sendMessage()"
          class="form-control"
          id="produkt"
          placeholder="Produkt hinzufügen..."
        />
      </div>

      <div class="grid">
        <div v-for="result in results" class="item" @click="addItem(result, getNumber())">
          <img class="img-fluid" :src="result.doc.bild" />
          <span>{{getNumber()}} {{result.doc.preinheit}} {{getName(result.doc.produktname, result.doc.plural)}}</span>
        </div>
      </div>

      <hr />
      <div class="grid">
        <div v-for="result in liste" class="item">
          <img class="img-fluid" :src="result.doc.bild" />
          <span>{{result.doc.number}} {{result.doc.preinheit}} {{getName(result.doc.produktname, result.doc.plural)}}</span>
        </div>
      </div>
    </div>

    <footer class="d-none d-md-block">
      <span>INEZ Code Competion submission by Tom Marienfeld</span>
    </footer>
  </div>
</template>



<script>
import io from "socket.io-client";
import { liste } from "./storage.js";
const PouchDB = require("pouchdb").default;
var db = new PouchDB("liste");

export default {
  name: "app",
  data() {
    return {
      data: "",
      results: [],
      liste: [],
      socket: io(process.env.VUE_APP_ADRESS + ":" + process.env.VUE_APP_PORT)
    };
  },
  created() {
    this.getItems().then(response => (this.liste = response));
  },
  mounted() {
    this.socket.on("result", data => {
      this.results = data;
    });
  },
  methods: {
    getItems: () => {
      return db.allDocs({ include_docs: true }).then(function(lebensmittel) {
        return lebensmittel.rows;
      });
    },
    countItemUp: function(item, number) {
      db.get(item.doc._id).then(function(doc) {
        doc.number += 1;
        return db.put(doc);
      });
    },
    itemExists: function(item) {
      return db.get(item.doc._id);
    },
    addItem: function(item, number) {
      this.itemExists(item)
        .then(() => {
          this.countItemUp(item, number);
          console.log(item);
          let listItem = this.liste.find(x => x.doc._id === item.doc._id);
          console.log(listItem);
          listItem.doc.number += parseInt(number);
        })
        .catch(err => {
          delete item.doc._rev;
          item.doc.number = parseInt(number);
          db.put(item.doc).then(function() {
            console.log("Erfolg!");
          });
          this.liste.push(item);
          console.log(err);
        });
    },
    sendMessage: function() {
      if (this.data == "") {
        this.results = [];
      } else {
        this.socket.emit("query", this.lastWord(this.data));
      }
    },
    lastWord: function(words) {
      var n = words.split(" ");
      return n[n.length - 1];
    },
    getNumber: function() {
      var num = this.data.replace(/[^0-9]/g, "");
      if (num == "") {
        num = "1";
      }
      return num;
    },
    getName: function(produktname, plural) {
      if (this.getNumber() > 1) {
        return plural;
      } else {
        return produktname;
      }
    }
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  background-color: #f5f5f5 !important;
  height: 100%;
}
h1 {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}
nav {
  min-height: 100px;
  background-image: URL("https://www.edeka.de/b2c-design/global/core/assets/images/background-dark.jpg");
  background-size: auto;
  background-repeat: repeat;
}

#cont {
  heigth: 100%;
}

#logo {
  margin-top: 1rem;
  width: 52px;
  height: 64px;
  margin-left: auto;
  margin-right: 40px;
}

.nav-item a {
  margin-left: 20px;
  color: white;
  font-family: "Work Sans", sans-serif;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 1rem;
    padding: 0px !important;
    padding-left: 10px !important;
    padding-top: 30px !important;
  }
}

.navbar .navbar-collapse {
  text-align: center;
}

.nav-link:hover {
  color: #f5d033 !important;
}

a:hover {
  color: #f5d033 !important;
}
i {
  margin-right: 10px;
}

.grid {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, 100px);
}

.item {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  background-color: white;
  height: 100px;
  line-height: 10px;
  margin-top: 20px;
  max-width: 200px;
  padding: 3px;
}

.item:hover {
  cursor: pointer;
}

.item span {
  font-size: 10px;
  font-family: "Work Sans", sans-serif;
}

.item img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 64px;
}

footer {
  position: fixed;
  background-color: #f5d033;
  height: 40px;
  width: 100%;
  bottom: 0;
}

footer span {
  line-height: 40px;
  margin-left: 40px;
}

.btn-outline-success {
  color: #f5d033 !important;
}

.btn-outline-success:hover {
  color: black !important;
  background-color: #f5d033 !important;
  border-color: #f5d033 !important;
}
</style>
