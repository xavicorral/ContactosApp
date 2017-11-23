angular.module('contactos.services', [])

    .factory('ContactosService', function() {

        // Some fake testing data
        var fakeContacts = [
            { nombre: 'Xavi', apellidos: 'Corral Cabús', id: 1, comentarios: 'Profesor' },
            { nombre: 'Oriol', apellidos: 'Blas Guinovart', id: 2,  comentarios: 'Coordinador' },
            { nombre: 'Esteve', apellidos: 'Escolà', id: 3,  comentarios: 'Alumno'}
        ];

        var metodos = {

            all: function () {
                var listaContactos = window.localStorage['contactos'];
                if(listaContactos) {
                    return angular.fromJson(listaContactos)
                } else {
                    return [];
                }
            },

            get: function (contactoId) {
                var listaContactos = this.all();
                for(var i=0; i < listaContactos.length; i++) {
                    if (listaContactos[i].id == contactoId) {
                        return listaContactos[i];
                    }
                }
            },

            save: function (listaContactos) {
                window.localStorage['contactos'] = angular.toJson(listaContactos);
            },

            add: function (contacto) {
                var listaContactos = this.all();
                contacto.id = listaContactos.length + 1;
                listaContactos.push(contacto);
                this.save(listaContactos);
            },

            addFakeContacts: function () {
                if(this.all() === []) {
                    this.save(fakeContacts);
                }
            }

        }

        return metodos;
    });

