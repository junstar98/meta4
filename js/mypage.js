;(function() {

    $(document).ready(function(){
        
	});


    var myPageClubs = [];
    var myPageClubs2 = [];
    var mySuggestions = [];

    function arrayRemove(arr, value) {
        return arr.filter(function(ele){
            return ele != value;
        });
    }

    function readMyClubs(callback) {
		return firebase
		.database()
		.ref("/MyPageDemo/")
		.once("value", function(snapshot) {
            var myValue = snapshot.val();
            if (myValue != null) {
                var keyList = Object.keys(myValue);
            
                myPageClubs = [];
                for (var i = 0; i < keyList.length; i++) {
                    var currKey = keyList[i];
                    var clubName = myValue[currKey].name;
                    myPageClubs.push(clubName);

                }
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
            
            var rand_list = [];

            for (var num = 0; num < 5; num++) {
                var rand_num = Math.floor(Math.random()*keyList.length);
                rand_list.push(rand_num);
            }
            console.log(rand_list);

            var count = 0;
			for (var i = 0; i < keyList.length; i++) {
                var currKey = keyList[i];
                for (var j = 0; j < myPageClubs.length; j++) {
                    if (currKey.toUpperCase() == myPageClubs[j]) {
                        myPageClubs2.push(currKey);
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
                    else {
                        if (i == rand_list[count]) {
                            if (mySuggestions.length < 2) {
                                mySuggestions.push(currKey);
                                count++;
                            }
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

    function makeClubdiv(i) {
        var clubs = document.getElementById("myclubs");
        var node = document.createElement("tr");

        var node1 = document.createElement("td");
        
        node1.innerHTML = myPageClubs2[i];

        var node2 = document.createElement("td");

        node2.setAttribute("class","text-right")

        var node3 = document.createElement("a");
        
        node3.setAttribute("class","trigger info-color text-white");
        node3.setAttribute("id","seemore");
        node3.innerHTML = "See More"

        var node4 = document.createElement("a");
        var node5 = document.createElement("i");

        node5.setAttribute("class","fas fa-times mx-1");
        node5.setAttribute("id","ex");
        
        node4.appendChild(node5);
        node2.appendChild(node3);
        node2.appendChild(node4);
        node.appendChild(node1);
        node.appendChild(node2);

        clubs.appendChild(node);

        node5.addEventListener("click",function() {
            clubs.removeChild(node);
            deleteclub(myPageClubs2[i])
            for (var n = 0; n < 5; n++) {
                var time_slot = document.getElementById(myPageClubs2[i])
                if (time_slot != undefined) {
                    var time_slot_parent = document.getElementById(myPageClubs2[i]).parentNode;
                    time_slot_parent.parentElement.removeChild(time_slot_parent);
                }
                
            }
        });

    }

    function makeSugdiv(i) {
        var clubs = document.getElementById("mysugg");
        var node = document.createElement("tr");

        var node1 = document.createElement("td");
        
        node1.innerHTML = mySuggestions[i];

        var node2 = document.createElement("td");

        node2.setAttribute("class","text-right")

        var node3 = document.createElement("a");
        
        node3.setAttribute("class","trigger info-color text-white");
        node3.setAttribute("id","seemore");
        node3.innerHTML = "See More"

        var node6 = document.createElement("a");
        node6.setAttribute("class","trigger info-color text-white");
        node6.setAttribute("href","#");


        var node4 = document.createElement("a");
        var node5 = document.createElement("i");

        node5.setAttribute("class","fas fa-times mx-1");
        node5.setAttribute("id","ex");
        
        node4.appendChild(node5);
        node2.appendChild(node3);
        node2.appendChild(node4);
        node.appendChild(node1);
        node.appendChild(node2);

        clubs.appendChild(node);

        node5.addEventListener("click",function() {
            clubs.removeChild(node);
            deleteclub(mySuggestions[i])
            for (var n = 0; n < 5; n++) {
                var time_slot = document.getElementById(mySuggestions[i])
                if (time_slot != undefined) {
                    var time_slot_parent = document.getElementById(mySuggestions[i]).parentNode;
                    time_slot_parent.parentElement.removeChild(time_slot_parent);
                }
                
            }
        });

    }


    function deleteclub(clubname) {
        return firebase.database().ref("/MyPageDemo/").once("value",function(snapshot) {
  
            var myValue = snapshot.val();


            var keyList = Object.keys(myValue);

            for (var i = 0; i < keyList.length; i++) {
                var currKey = keyList[i];
                console.log(myValue[currKey].name);
                if (myValue[currKey].name==clubname.toUpperCase()) {
                    var refDB = firebase.database().ref("/MyPageDemo/"+currKey);
                    refDB.remove();
                    myPageClubs = arrayRemove(myPageClubs,clubname);
                }
            }
            
        });
        
    }

    function callDefault() {
        readMyClubs(function() {
            readClubInfo(function() {
                console.log(myClubs);
                for (var a=0; a < myPageClubs.length; a++) {
                    makeClubdiv(a);
                }
                console.log(mySuggestions);
                makeTimeSlot();
            });
        });
 
    };


    callDefault();
    
}());