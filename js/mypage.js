;(function() {

    $(document).ready(function(){
        
	});


    var myPageClubs = [];

    function readMyClubs(callback) {
		return firebase
		.database()
		.ref("/MyPageDemo/")
		.once("value", function(snapshot) {
			var myValue = snapshot.val();

            var keyList = Object.keys(myValue);
            
            myPageClubs = [];
			for (var i = 0; i < keyList.length; i++) {
                var currKey = keyList[i];
                var clubName = myValue[currKey];
                myPageClubs.push(clubName);

            }
            //console.log(myPageClubs);

            callback();
        });
    }

    var myClubs = [];

    function readClubInfo(callback) {
		return firebase
		.database()
		.ref("/Info/")
		.once("value", function(snapshot) {
			var myValue = snapshot.val();

			var keyList = Object.keys(myValue);
            

			for (var i = 0; i < keyList.length; i++) {
                var currKey = keyList[i];
                for (var j = 0; j < myPageClubs.length; j++) {
                    if (currKey == myPageClubs[j]) {
                        for (var k in myValue[currKey].Time) {
                            let details = [];
                            details.push(currKey);
                            var time = myValue[currKey].Time[k];
                            var date_time = time.split(": ");
                            details.push(date_time[0]);
                            var hours = date_time[1];
                            //console.log(hours);
                            details.push(hours.split(" - ")[0]);
                            details.push(hours.split(" - ")[1]);

                            //console.log(details);

                            myClubs.push(details);
                        }
                        
                        
                    }
                }
            }
            callback();
        });
    }

    function makeTimeSlot() {
        var all_data = [];
        //console.log("myClubs:",myClubs);
        for (var x = 0; x < myClubs.length; x++) {
            var clubname = myClubs[x][0];
            var dayname = myClubs[x][1];
            switch(dayname) {
                case "Mon":
                    var day_num = 0;
                    break;
                case "Tue":
                    var day_num = 1;
                    break;
                case "Wed":
                    var day_num = 2;
                    break;
                case "Thu":
                    var day_num = 3;
                    break;
                case "Fri":
                    var day_num = 4;
                    break;
                case "Sat":
                    var day_num = 5;
                    break;
                default:
                    var day_num = 6;
            }
            all_data.push({
                day: day_num,
                periods: [[myClubs[x][2],myClubs[x][3]]],
                name: clubname
            })
        }
        //console.log(all_data);

        $("#schedule-demo").jqs({
            data: all_data
        });
        
    }

    function makeClubdiv() {
        var clubs = document.getElementById("clubs")
    }



    function callDefault() {
        readMyClubs(function() {
            makeClubdiv();
            readClubInfo(function() {
                makeTimeSlot();
            });
        });
 
    };


    callDefault();
    
}());