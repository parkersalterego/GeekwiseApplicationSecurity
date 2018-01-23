// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getCars() {
    jQuery.get(`${_baseUrl}:3000/api/car`, function(data) {
        data.data.forEach((car) => {
            console.log(car);
           let newElement = document.createElement('div');
           let postTitle = document.createElement('h2');
           let postImage = document.createElement('img');
           let postBody = document.createElement('p');
           let editDelete = document.createElement('p');


           let edit = `<a href='#' data-carid='${car.id}' data-carmake='${car.make}' data-carmodel='${car.model}' data-caryear='${car.year}' onclick='editCar(event)'>edit</a>`;
            let del = `<a href='#' data-carid='${car.id}' onclick='delCar(event)'>delete</a>`;

           newElement.classList.add('post');
           postTitle.classList.add('postTitle');
           postImage.classList.add('postImage');
           postBody.classList.add('postBody');
           editDelete.classList.add('editDelete');

           postTitle.innerHTML = `${car.make}`;
           postImage.src = `${car.model}`;
           postBody.innerHTML = `${car.year}`;
           editDelete.innerHTML = `${edit} | ${del}`;

        document.querySelector('.posts').appendChild(newElement);
        newElement.appendChild(editDelete);
        newElement.appendChild(postBody);
        newElement.appendChild(postTitle);
        newElement.appendChild(postImage);
        
        });
    });
}

function addCar(e) {
    e.preventDefault();
    let make = $("#make");
    let model = $("#model");
    let year = $("#year");
    let carid = $("#carid");

    let makeVal = make.val();
    let modelVal = model.val();
    console.log(year);
    let yearVal = year.val();

    if(makeVal == "" || modelVal == "" || yearVal == "") {
        alert('Make, Model, and Year cannot be blank');
        return;
    }

    if (+carid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/car`, { make: makeVal, model: modelVal, year: yearVal }, function(data) {
            getCars();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/car/${carid.val()}`,
                data: { make: make.val(), model: model.val(), year: year.val() }
            })
            .done(function(msg) {
                getCars();
            });
    }

    carid.val(0);
    $("#car-submit").val('Add Car');
    model.val("");
    make.val("");
    year.val("");
}

function editCar(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let make = $("#make");
    let model = $("#model");
    let year = $("#year");
    let id = $("#carid");
    

    let makeVal = el.data("carmake");
    let modelVal = el.data("carmodel");
    let yearVal = el.data("caryear")
    let idVal = el.data("carid");

    $("#car-submit").val(`Edit Post #${idVal}`);
    make.val(makeVal);
    model.val(modelVal);
    year.val(yearVal);
    id.val(idVal);
}

function delCar(e) {
    e.preventDefault();
    
    let el = $(e.srcElement);
    let carid = el.data("carid");
    if(confirm(`Are you sure you want to delete car #${carid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/car/${carid}`
            })
            .done(function(msg) {
                getCars();
            });
    }
}


// run getCars on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getCars();
    $("#add-car").on('submit', addCar);
   
});