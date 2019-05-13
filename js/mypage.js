;(function() {

    $(document).ready(function(){
		$("#schedule-demo").jqs({
            mode: "read",
            hour: 24,
            data: [
                {
                    day: 0,
                    periods: [
                        ["06:00", "12:00"]
                    ],
                    name: "Gaori"
                }, {
                    day: 0,
                    periods: [
                        ["12:00", "13:00"]
                    ],
                    name: "미담장학회"
                }
            ]
        });
	});


    function readClubInfo(callback) {
		return firebase
		.database()
		.ref("/Info/")
		.once("value", function(snapshot) {
			var myValue = snapshot.val();

			var keyList = Object.keys(myValue);
            console.log(keyList);

			for (var i = 0; i < keyList.length; i++) {
                let details = [];
                var currKey = keyList[i];
                details.push(currKey);
                details.push(myValue[currKey].Brief);
                details.push(myValue[currKey].Category);
                details.push(myValue[currKey].Member);
                details.push(myValue[currKey].GenderRatio);
                details.push(myValue[currKey].Fee);
            }
            //console.log(details);
            
			callback();
        });
    }

    function readMyClubs() {
		return firebase
		.database()
		.ref("/MyPageDemo/")
		.once("value", function(snapshot) {
			var myValue = snapshot.val();

			var keyList = Object.keys(myValue);
            
            let details = [];
			for (var i = 0; i < keyList.length; i++) {
                var currKey = keyList[i];
                details.push(myValue[currKey]);
            }
            console.log(details);
            

        });
    }



    function callDefault() {
        
    };



    readMyClubs(function() {
        readClubInfo();
	});
    
}());