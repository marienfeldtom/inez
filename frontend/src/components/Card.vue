<template>
  <div>
    <img class="img-fluid" :src="item.bild" />
    <span>{{span}}</span>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["item", "number"],
  data() {
    return {};
  },
  methods: {
    getEinheit(einheit) {
      let einheiten = [
        ["Stück", "Stücke"],
        ["Packung", "Packungen"],
        ["Gramm", "Gramm"],
        ["Liter", "Liter"],
        ["Flasche", "Flaschen"],
        ["Becher", "Becher"],
        ["Kasten", "Kästen"],
        ["Kilogramm", "Kilogramm"],
        ["Dose", "Dosen"]   
        
        ];
      var found = einheiten.find(function(element) {
        return element[0] == einheit;
      });
      return found[1];
    }
  },
  computed: {
    span: function() {
      let name;
      let number;
      let einheit;
      this.number ? (number = this.number) : (number = this.item.number);
      number > 1 ? (name = this.item.plural) : (name = this.item.produktname);
      number > 1 ? einheit = this.getEinheit(this.item.preinheit) : einheit = (this.item.preinheit);
      return number + " " + einheit + " " + name;
    }
  }
};
</script>