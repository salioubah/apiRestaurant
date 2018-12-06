window.onload = init;

function init() {
  new Vue({
    el: "#app",

    data: {
      restaurants: [],
      nom: "",

      cuisine: "",

      ids: "",

      nbreResto: 0,

      page: 1,
      pagesize: 10,
      name: ""
    },
    mounted() {
      this.getRestaurantsFromServer();
    },

    methods: {
      getRestaurantsFromServer: function() {
        let url =
          "http://localhost:8080/api/restaurants?page=" +
          this.page +
          "&pagesize=" +
          this.pagesize +
          "&name=" +
          this.name;
        fetch(url)
          .then(reponseJSON => {
            reponseJSON.json().then(reponseJSON => {
              this.restaurants = reponseJSON.data;
              this.nbreResto = reponseJSON.count;
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      methodForm: function(event) {
        let id = document.querySelector("#ids").value;
        if (id) this.modifierRestaurant(event);
        else this.ajouterRestaurant(event);
      },

      getRestaurantById: function(id) {
        let url = "http://localhost:8080/api/restaurants/" + id;

        fetch(url)
          .then(responseJSON => {
            responseJSON.json().then(res => {
              // Maintenant res est un vrai objet JavaScript
              //console.log(res);
              this.name = res.restaurant.name;
              this.cuisine = res.restaurant.cuisine;
              this.ids = res.restaurant._id;
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      supprimerRestaurant: function(id) {
        let url = "http://localhost:8080/api/restaurants/" + id;

        fetch(url, {
          method: "DELETE"
        })
          .then(function(responseJSON) {
            responseJSON.json().then(function(res) {
              // Maintenant res est un vrai objet JavaScript
              //afficheReponseDELETE(res);
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      modifierRestaurant: function(event) {
        // Pour éviter que la page ne se ré-affiche
        event.preventDefault();

        let form = event.target;
        let donneesFormulaire = new FormData(form);
        let id = document.querySelector("#ids").value;

        let url = "http://localhost:8080/api/restaurants/" + id;

        fetch(url, {
          method: "PUT",
          body: donneesFormulaire
        })
          .then(function(responseJSON) {
            responseJSON.json().then(function(res) {
              // Maintenant res est un vrai objet JavaScript
              //afficheReponsePUT(res);
              console.log(res);
              this.name = "";
              this.cuisine = "";
              this.ids = "";
              this.getRestaurantsFromServer();
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      ajouterRestaurant: function(event) {
        event.preventDefault();

        let form = event.target;

        let donneesFormulaire = new FormData(form);

        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
          method: "POST",
          body: donneesFormulaire
        })
          .then(responseJSON => {
            responseJSON.json().then(res => {
              // Maintenant res est un vrai objet JavaScript
              console.log(res);
              this.name = "";
              this.cuisine = "";
              this.getRestaurantsFromServer();
            });
          })
          .catch(function(err) {
            console.log(err);
          });
      },

      firstPage: function() {
        this.page = 1;
        this.getRestaurantsFromServer();
      },

      lastPage: function() {
        this.page =
          this.nbreResto % this.pagesize > 0
            ? parseInt(this.nbreResto / this.pagesize, 10) + 1
            : parseInt(this.nbreResto / this.pagesize, 10);
        this.getRestaurantsFromServer();
      },

      precedent: function() {
        if (this.page > 1) {
          this.page--;
          this.getRestaurantsFromServer();
        }
      },

      precedentDisable: function() {
        if (this.page > 1) return false;
        else return true;
      },

      suivant: function(count) {
        if (count - this.page * this.pagesize > 0) {
          this.page++;
          this.getRestaurantsFromServer();
        }
      },

      suivantDisable: function(count) {
        if (count - this.page * this.pagesize > 0) return false;
        else return true;
      },

      reload: function() {
        this.getRestaurantsFromServer();
        //return _.debounce(this.getRestaurantsFromServer(), 1500);
      },

      getColor(index) {
        return index % 2 == 0 ? "color: yellow" : "color: green";
      }
    }
  });
}
