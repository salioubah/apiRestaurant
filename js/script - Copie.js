window.onload = init;

function init() {
    new Vue({
        el: "#app",
        data: {
            restaurants: [],
            nom: "",
            cuisine:""
        },
        methods: {
            supprimerRestaurant: function (index) {
                this.restaurants.splice(index, 1);
            },
            ajouterRestaurant: function () {
                let nouveauRestaurant = {
                    nom:this.nom,
                    cuisine:this.cuisine,
                    id:_.uniqueId("restaurant_")
                }

                this.restaurants.push(nouveauRestaurant);

                // on remet à zéro les champs
                this.nom = "";
                this.cuisine = "";
            },
            getColor(index){
                return (index % 2 == 0)? 'color: yellow':'color: green';
            }
        }
    });
}