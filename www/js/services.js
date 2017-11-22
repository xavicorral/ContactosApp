angular.module('contactos.services', [])

    .factory('ContactosService', function() {

        // Some fake testing data
        var listaContactos = [
            { nombre: 'Xavi', apellidos: 'Corral Cabús', id: 1, comentarios: 'Profesor' },
            { nombre: 'Oriol', apellidos: 'Blas Guinovart', id: 2,  comentarios: 'Coordinador' },
            { nombre: 'Esteve', apellidos: 'Escolà', id: 3,  comentarios: 'Alumno'}
        ];

        var metodos = {
            all: function () {
                return listaContactos;
            },
            get: function (contactoId) {
                for(var i=0; i < listaContactos.length; i++) {
                    if (listaContactos[i].id == contactoId) {
                        return listaContactos[i];
                    }
                }
            },
            add: function (nuevoContacto) {
                listaContactos.push(nuevoContacto);
            }
        }

        return metodos;
    });

