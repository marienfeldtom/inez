<template>
<div style="height: 100%;">
<div>
  <b-nav id="nav">
  <img src="./assets/logo.png" style="height: 80px; width: auto; margin-top: 10px; margin-left: 30px;">
    <b-nav-item active><i class="fas fa-list-ul"></i>Einkaufsliste</b-nav-item>
    <b-nav-item><i class="fas fa-map-pin"></i>Edeka Finder</b-nav-item>
    
  <img id="logo" class="" src="https://www.edeka.de/b2c-design/global/core/assets/organisms/m401-header/logo.png">
  </b-nav>
</div>

 <b-container id="cont">
        <h1>Einkaufsliste:</h1>
         <b-form-input v-model="data" @keyup="sendMessage()" placeholder="Produkt hinzufügen..."></b-form-input>

<div class="grid">
  <div v-for="result in results" class="item">
  <img class="img-fluid" :src="result.bild">
  <span> {{getNumber()}} {{result.preinheit}} {{getName(result.produktname, result.plural)}}</span>
  </div>
</div>

        <hr>
<div class="grid">
  <div v-for="result in liste" class="item">
  <img class="img-fluid" :src="result.bild">
  <span> 1 {{result.preinheit}} {{result.produktname}}</span>
  </div>
</div>
      </b-container>

      <footer>
      <span>INEZ Code Competion submission by Tom Marienfeld</span>
      </footer>
      </div>
</template>



<script>
import io from 'socket.io-client';
export default {
  name: 'app',
  data() {
    return {
      data: '',
      results: [],
      liste: [
    {
      "produktname": "Karotte",
      "plural": "Karotten",
      "bild": "https://www.lebensbaum.com/files/styles/greige_image_476x476/public/images/greiges/karotte1.jpg?itok=ebABzEHu",
      "kategorie": "Obst & Gemüse",
      "synonyme": [
        "Möhre",
        "Rübe"
      ],
      "preinheit": "Stück",
      "einheiten": [
        "Packung",
        "Kilogramm"
      ]
    },
    {
      "produktname": "Aubergine",
      "plural": "Auberginen",
      "bild": "https://res.cloudinary.com/lush/image/upload/v1/lush_content/ingredients/main/2019/01/web_aubergine_ingreedients_2019-2.jpg?itok=YynZ56eL",
      "kategorie": "Obst & Gemüse",
      "synonyme": [
        "Melanzani"
      ],
      "preinheit": "Stück",
      "einheiten": [
        ""
      ]
    },
    {
      "produktname": "Banane",
      "plural": "Bananen",
      "bild": "https://www.hofladen-sauerland.de/media/image/b0/37/70/Banane_600x600.jpg",
      "kategorie": "Obst & Gemüse",
      "synonyme": [
        ""
      ],
      "preinheit": "Stück",
      "einheiten": [
        "Bund"
      ]
    },
    {
      "produktname": "Brot",
      "plural": "Brote",
      "bild": "https://www.honold.ch/components/com_mijoshop/opencart/image/cache/catalog/boulangerie/chnusper-dinkel-brot-500x500.png",
      "kategorie": "Backwaren",
      "synonyme": [
        ""
      ],
      "preinheit": "Stück",
      "einheiten": [
        ""
      ]
    },
    {
      "produktname": "Zwiebel",
      "plural": "Zwiebeln",
      "bild": "https://www.gesundheute.com/wp-content/uploads/2014/10/Onion_on_White-compressed.jpg",
      "kategorie": "Obst & Gemüse",
      "synonyme": [
        ""
      ],
      "preinheit": "Stück",
      "einheiten": [
        "Beutel"
      ]
    }],
      socket: io(process.env.VUE_APP_ADRESS + ':' + process.env.VUE_APP_PORT)
    }
  },
  created: {

  },
  mounted() {
        this.socket.on('result', (data) => {
            this.results = data;
        });
    },
  methods: {
    sendMessage: function(){
      if(this.data == "") {
        this.results = [];
      } else {
      this.socket.emit('query', this.lastWord(this.data));
      }
    },
   lastWord: function (words) {
    var n = words.split(" ");
    return n[n.length - 1];
},
  getNumber: function(){
    var num =  this.data.replace(/[^0-9]/g,'');
    if(num =="") {
      num = "1";
    } 
    return num;

  },
  getName: function(produktname, plural) {
    if(this.getNumber()>1) {
      return plural;
    } else {
      return produktname;
    }
  }
  }
}
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
#nav {
  height: 100px;
  background-image: URL("https://www.edeka.de/b2c-design/global/core/assets/images/background-dark.jpg");
  background-size: contain; 
  background-repeat: repeat;
  width: 100%;
}

#cont{
  heigth: 100%;
}

#logo {
  margin-top: 1rem;
  width: 52px;
  height: 64px;
  margin-left:auto; 
  margin-right:40px;
}

.nav-link {
  padding-top: 2rem !important;
  color: white;
  font-family: 'Work Sans', sans-serif;
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
  font-family: 'Work Sans', sans-serif;
}

.item img{
 display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
 height: 64px;
}

footer {
  position:fixed;
  background-color: #f5d033;
  height: 40px;
  width: 100%;
  bottom: 0;
}

footer span {
  line-height: 40px;
  margin-left: 40px;
}
</style>
