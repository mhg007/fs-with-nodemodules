export default function(formetdate){
    
    var date = formetdate.split("/");
    var d = date[0];
    var m = date[1];
    var y = date[2];
    // var d = new Date();

    return ( y + '-' + m + '-' + d)
}


// var date = new Date('04/01/2015'); // M-D-YYYY

		