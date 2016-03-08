var $ = function (id) {
    return document.getElementById(id);
}

var Person = function() {
    var data = {
        first_name:'firstname',
        $first_name: function(n){data.first_name = n},
        last_name:'lastname',
        $last_name: function(n){data.last_name = n},
        email:'example@example.com',
        $email: function(n){data.email = n}
    };

    var F = function() {};
    f = new F();

    f.pname = 'Person';
    f.run = function (e) {
        return data[e];
    };
    return f;
}();

var Employee = function (p) {
    var data = {
        ss_number:'000000',
        $ss_number: function(n) {data.ss_number = n}
    };
    var F = function(){};
    F.prototype = p;
    f = new F();

    f.ename = 'Employee';
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };
    return f;
}(Person);

var Customer = function (p) {
    var data = {
        customer_number:'00000',
        $customer_number: function(n) {data.customer_number = n}
        //displayText: "",
        //$displayText: function() {data.displayText =  "Name: " + data.first_name + " " + data.last_name + "\nEmail: " + data.email +
        //    "\nCustomer number: " + data.customer_number}
    };
    var F = function(){};
    F.prototype = p;
    f = new F();

    f.cname = 'Customer';
    f.run = function (e) {
        var r = data[e];
        if(r === undefined) return F.prototype.run(e);
        else return r;
    };
    return f;
}(Person);

var PersonApp = function(ptype,first_name,last_name,email) {
    if (ptype == "c"){
        var number = prompt("Customer Number:");
        while(number == ""){
            number = prompt("Customer Number:");
        }
        var c1 = Object.create(Customer);
        c1.run('$first_name')(first_name);
        c1.run('$last_name')(last_name);
        c1.run('$email')(email);
        c1.run('$customer_number')(number);
        //c1.run('$displayText');
        c1.displayText = function(a){return "You entered:\nName: " + a.run('first_name') + " " + a.run('last_name') + "\nEmail: " + a.run('email') +
            "\nCustomer number: " + a.run('customer_number')};
        alert(c1.displayText(c1));
    } else {
        var number = prompt("Social Security Number:");
        while(number == ""){
            number = prompt("Social Security Number:");
        }
        var e1 = Object.create(Employee);
        e1.run('$first_name')(first_name);
        e1.run('$last_name')(last_name);
        e1.run('$email')(email);
        e1.run('$ss_number')(number);
        //c1.run('$displayText');
        e1.displayText = function(a){return "You entered:\nName: " + a.run('first_name') + " " + a.run('last_name') + "\nEmail: " + a.run('email') +
            "\nSocial security number: " + a.run('ss_number')};
        alert(e1.displayText(e1));
    }

};

var processEntries = function() {
    var ptype = $("ptype").value;
    var first_name = $("first_name").value;
    var last_name = $("last_name").value;
    var email = $("email").value;

    //Does not test that all fields are filled, as you may be entering
    //info for a customer for whom you only have partial information
    //DOES test to make sure you specify customer/employee and give a number
    if (ptype == "c" || ptype == "e") {
        PersonApp(ptype,first_name,last_name,email);
        $("ptype").focus();
    }
    else {
        alert("Invalid response.")
        $("ptype").focus();
    }
}
window.onload = function () {
    $("continue").onclick = processEntries;
}