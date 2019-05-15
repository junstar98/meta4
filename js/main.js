;(function () {
	
	'use strict';
	  
	var colorMap = new Map();
	colorMap.set("Academic", "blue");
	colorMap.set("Culture", "red");
	colorMap.set("Community Service", "green");
	colorMap.set("Music","magenta");
	colorMap.set("Sports","purple");
	colorMap.set("Others","orange");

	console.log(colorMap);
	var ClubColor = new Map();

	function matchColor(){
		return firebase.database().ref("/Info/").once("value",function(snapshot){
			var myValue = snapshot.val();
			var keyList = Object.keys(myValue);

			for(var i=0; i<keyList.length; i++){
				var currKey = keyList[i];
				ClubColor.set(currKey,colorMap.get(myValue[currKey].Category))
			}

		});
		
	}
	matchColor();
	console.log(ClubColor);

	function readClubInfo(callback) {
		return firebase
		.database()
		.ref("/Info/")
		.once("value", function(snapshot) {
			var myValue = snapshot.val();

			var keyList = Object.keys(myValue);
			//console.log(keyList);

			for (var i = 0; i < keyList.length; i++) {
			let details = [];
			var currKey = keyList[i];
			details.push(currKey);
			details.push(myValue[currKey].Brief);
			details.push(myValue[currKey].Category);
			details.push(myValue[currKey].Member);
			details.push(myValue[currKey].GenderRatio);
			details.push(myValue[currKey].Fee);
			details.push(myValue[currKey].Description);

			//console.log(details);
			makeClubDiv(details[0], details[1], details[2], details[3], details[4], details[5], details[6]);
			}

			callback();
		});
	}

	function readQNA(callback){
		return firebase.database().ref("/QnA/").once("value", function(snapshot){
			var myValue = snapshot.val();

			var keyList = (Object.keys(myValue)).reverse();
			//console.log(keyList);

			for (var i = 0; i < keyList.length; i++){
				let details =[];
				let comments = []

				var currKey = keyList[i];
				details.push(myValue[currKey].Question);
				details.push(myValue[currKey].Club);
				details.push(myValue[currKey].Likes);
				details.push(myValue[currKey].CommentCount);
				
				if(myValue[currKey].CommentCount!=0){
					let commentList = myValue[currKey].Comments;
					
					comments.push(Object.values(commentList));
					
				}

				makeQNADiv(details[0],details[1],details[2],details[3],comments);
			}
			callback();
		})
	}
	
	// add question to firebase
	function newQuestion(question,club){
		var newKey = firebase.database().ref('/QnA/').push();
		//console.log(newKey);
		newKey.set({
			Question: question, 
			Club: club,
			CommentCount: 0,
			Likes: 0
		});
	}
	//press Submit button
	$(".questButton").click(function(){
		var toClub = $(".dropdown-toggle").text()
		var newQ = $("#newQuest").val();
		//console.log(newQ);
		newQuestion(newQ,toClub);
		$("#QNAs").empty();
		readQNA(function(){
			callDefault();
		})
		$(".dropdown-toggle").text("Clubs");
		$("#newQuest").val('');
	});
	//when mouse leaves qna box after seeing comment
	$(document).on("mouseleave",".col-md-6",function(event){

			$(".project2 .desc").css("opacity","1");
			$(".project2 .desc2").css("opacity","0");
		
	});

	//Comment Button
	$(document).on("click",".project2 .desc .con .icon_c span", function(event){
		//console.log(event.target)
		event.preventDefault();
		if($(event.target).hasClass("commentButton")){
			$(event.target.parentNode.parentNode.parentNode.parentNode).css("opacity","0");
			//console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[1])
			$(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[1]).css("opacity","1");
		}

		if($(event.target).hasClass("fa-comment")){
			$(event.target.parentNode.parentNode.parentNode.parentNode.parentNode).css("opacity","0");
			$(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1]).css("opacity","1");
		}
	});
	//Close Button
	$(document).on("click",".project2 .desc2 .con2 .allcomments .icon-times", function(event){
		console.log(event.target.parentNode.parentNode.parentNode.parentNode.children[0]);
		console.log(event.target.parentNode.parentNode.parentNode.parentNode.children[1]);
		$(event.target.parentNode.parentNode.parentNode.parentNode.children[0]).css("opacity","1");
		$(event.target.parentNode.parentNode.parentNode.parentNode.children[1]).css("opacity","0");
	//Like Button
	});

	$(document).on("click",".project2 .desc .con .icon span", function(event){
		event.preventDefault();
		
		if($(event.target).hasClass("likeButton")){
			//console.log(event.target.parentNode)
			var compQuestion = $(event.target.parentNode.parentNode.parentNode.children[1]).text();
			var compClub = $(event.target.parentNode.parentNode.parentNode.children[0]).text();

			if($(event.target.parentNode).hasClass("liked")){
				$(event.target.parentNode).removeClass("liked");
				$(event.target.parentNode).addClass("disliked");
				//console.log($(event.target))
				$(event.target.children).css("color","black");
				//console.log($(this.children[0]));
	
				$(event.target).html($(event.target).html().replace($(event.target).text(),Number($(event.target).text())-1))

				//console.log($(this.parentNode.parentNode))
				//console.log($(event.target.parentNode.parentNode.parentNode))
	
				return firebase.database().ref("/QnA/").once("value", function(snapshot){
					var myValue = snapshot.val();
	
					var keyList = Object.keys(myValue);
	
					for (var i = 0; i < keyList.length; i++){
						var currKey = keyList[i];
						if(myValue[currKey].Question == compQuestion && myValue[currKey].Club == compClub ){
							//console.log("matched");
							firebase.database().ref("/QnA/"+currKey).update({Likes: myValue[currKey].Likes-1});
						}
					}
				});
				
				
			}
			else{
				//console.log(this)
				$(event.target.parentNode).addClass("liked");
				$(event.target.children).css("color","red");
				//console.log($(this.children[0]).html().replace($(this.children[0]).text(),Number($(this.children[0]).text())+1));
				$(event.target).html($(event.target).html().replace($(event.target).text(),Number($(event.target).text())+1))
	
				return firebase.database().ref("/QnA/").once("value", function(snapshot){
					var myValue = snapshot.val();
	
					var keyList = Object.keys(myValue);
	
					for (var i = 0; i < keyList.length; i++){
						var currKey = keyList[i];
						if(myValue[currKey].Question == compQuestion && myValue[currKey].Club == compClub ){
							//console.log("matched");
							firebase.database().ref("/QnA/"+currKey).update({Likes: myValue[currKey].Likes+1});
						}
					}
				});
			}
		}

		if($(event.target).hasClass("icon-heart")){
			//console.log(event.target.parentNode.parentNode.parentNode.parentNode.children[1])
			var compClub = $(event.target.parentNode.parentNode.parentNode.parentNode.children[0]).text();
			var compQuestion = $(event.target.parentNode.parentNode.parentNode.parentNode.children[1]).text();

			if($(event.target.parentNode.parentNode).hasClass("liked")){
				$(event.target.parentNode.parentNode).removeClass("liked");
				$(event.target.parentNode.parentNode).addClass("disliked");
				//console.log($(event.target))
				$(event.target).css("color","black");
				//console.log($(this.children[0]));
	
				$(event.target.parentNode).html($(event.target.parentNode).html().replace($(event.target.parentNode).text(),Number($(event.target.parentNode).text())-1))
				
				//console.log($(this.parentNode.parentNode))
				//console.log($(event.target.parentNode.parentNode.parentNode))
	
				return firebase.database().ref("/QnA/").once("value", function(snapshot){
					var myValue = snapshot.val();
	
					var keyList = Object.keys(myValue);
	
					for (var i = 0; i < keyList.length; i++){
						var currKey = keyList[i];
						if(myValue[currKey].Question == compQuestion && myValue[currKey].Club == compClub ){
							//console.log("matched");
							firebase.database().ref("/QnA/"+currKey).update({Likes: myValue[currKey].Likes-1});
						}
					}
				});
				
				
			}
			else{
				//console.log(this)
				$(event.target.parentNode.parentNode).addClass("liked");
				$(event.target).css("color","red");
				//console.log($(this.children[0]).html().replace($(this.children[0]).text(),Number($(this.children[0]).text())+1));
				$(event.target.parentNode).html($(event.target.parentNode).html().replace($(event.target.parentNode).text(),Number($(event.target.parentNode).text())+1))
	
				return firebase.database().ref("/QnA/").once("value", function(snapshot){
					var myValue = snapshot.val();
	
					var keyList = Object.keys(myValue);
	
					for (var i = 0; i < keyList.length; i++){
						var currKey = keyList[i];
						if(myValue[currKey].Question == compQuestion && myValue[currKey].Club == compClub ){
							//console.log("matched");
							firebase.database().ref("/QnA/"+currKey).update({Likes: myValue[currKey].Likes+1});
						}
					}
				});
			}
		}
		
	});
	//make dropdown based on club info in firebase
	function makeDropdown(){
		var place = document.getElementById("dropdown");
		
		return firebase.database().ref('/Info/').once("value",function(snapshot){
			var myValue = snapshot.val();
			var keyList = Object.keys(myValue);

			for (var i = 0; i < keyList.length; i++){
				var clubName = keyList[i];
				var node = document.createElement("a");
				node.setAttribute("class","dropdown-item");
				node.setAttribute("href","#");
				node.innerText = clubName;
				
				place.appendChild(node)
			}
		});
	}
	makeDropdown();

	//select a dropdown option
	$(document).on("click",".dropdown-item",function(event){
		var toClub = $(event.target).text();
		$(".dropdown-toggle").text(toClub);
	});

	function makeQNADiv(Question, Club, Likes, CommentCount,Comments){
	
		var place = document.getElementById("QNAs");
		var node = document.createElement("div");

		node.setAttribute("data-animate-effect", "fadeInLeft");
		node.setAttribute("class", "col-md-6 animate-box")

		var node2 = document.createElement("div");

		var theColor = ClubColor.get(Club);

		node2.setAttribute("class", "project2");
		node2.setAttribute(
			"style",
			'border: 3px solid; border-color:'+theColor+'; background-color: white; vertical-align: middle;'
			);
		
		var node3 = document.createElement("div");

		node3.setAttribute("class", "desc");

		var node4 = document.createElement("div");

		node4.setAttribute("class", "con");

		var clubNodeHeader = document.createElement("h3");
		var clubNode = document.createElement("a");
		clubNode.innerText = Club;
		
		var questionNode = document.createElement("span");

		questionNode.innerText = Question;

		var likeP = document.createElement("p");
		likeP.setAttribute("class","icon");
		
		var likeSpan = document.createElement("span");
		var likeA = document.createElement("a");
		likeA.setAttribute("href","#")
		likeA.setAttribute("class","likeButton");
		likeA.innerText = Likes;

		var commentP = document.createElement("p");
		commentP.setAttribute("class","icon_c");

		var commentSpan = document.createElement("span");
		var commentA = document.createElement("a");
		commentA.setAttribute("href","#")
		commentA.setAttribute("class","commentButton");
		commentA.innerText = CommentCount;

		var likeIcon = document.createElement("i");
		likeIcon.setAttribute("class","icon-heart");

		var commentIcon = document.createElement("i");
		commentIcon.setAttribute("class","far fa-comment")

		//secondary

		var node3_2 = document.createElement("div");

		node3_2.setAttribute("class", "desc2");

		var node4_2 = document.createElement("div");
		node4_2.setAttribute("class", "con2");

		var span2 = document.createElement("span");
		span2.setAttribute("class","allcomments")

		var com2 = document.createElement("div");
		com2.setAttribute("class","com2");
		
		var closeIcon = document.createElement("i");
		closeIcon.setAttribute("class","icon-times");
		span2.appendChild(closeIcon);
		
		if(Comments.length!=0){
			for(var i=0; i< Comments[0].length; i++){
				var commentNode = document.createElement("p")
				//console.log(Comments[0][i])
				commentNode.innerText = "A:   "+Comments[0][i];
				com2.appendChild(commentNode);
			}
		}
		span2.appendChild(com2);
		

		node4_2.appendChild(span2);
		node3_2.appendChild(node4_2);
		

		commentA.appendChild(commentIcon);
		commentSpan.appendChild(commentA);
		commentP.appendChild(commentSpan);

		likeA.appendChild(likeIcon);
		likeSpan.appendChild(likeA);
		likeP.appendChild(likeSpan);
		clubNodeHeader.appendChild(clubNode);
		
		node4.appendChild(clubNodeHeader);
		node4.appendChild(questionNode);
		node4.appendChild(likeP);
		node4.appendChild(commentP);

		node3.appendChild(node4);
		node2.appendChild(node3);
		node2.appendChild(node3_2);
		node.appendChild(node2);
		place.appendChild(node);
	
	}

	function makeClubDiv(name, brief, category, member, ratio, fee, description) {
		var place = document.getElementById("clubs");
		var node = document.createElement("div");

		//node.setAttribute("class", "col-md-3 animate-box");
		node.setAttribute("data-animate-effect", "fadeInTop");

		switch (category) {
		case "Sports":
			node.setAttribute("class", "col-md-3 animate-box Sports single-club");
			break;

		case "Culture":
			node.setAttribute("class", "col-md-3 animate-box Culture single-club");
			break;

		case "Academic":
			node.setAttribute("class", "col-md-3 animate-box Academic single-club");
			break;

		case "Music":
			node.setAttribute("class", "col-md-3 animate-box Music single-club");
			break;

		case "Community Service":
			node.setAttribute("class", "col-md-3 animate-box CommunityService single-club");
			break;

		case "Others":
			node.setAttribute("class", "col-md-3 animate-box Others single-club");
			break;

		default:
		}

		var node2 = document.createElement("div");
		console.log(category);
		console.log(colorMap.get(category));
		
		var theColor = colorMap.get(category);
		node2.setAttribute("class", "project");
		node2.setAttribute(
		"style",
		"border: 2px solid; border-color: "+theColor+"; background-color: rgba(44,152,240, 0.2); vertical-align: middle;"

		);

		var node3 = document.createElement("div");

		node3.setAttribute("class", "desc ");
		
		
		//modal with desc
		node3.setAttribute("data-toggle", "modal ");
		node3.setAttribute("data-target", "#basicExampleModal");
		

		var node4 = document.createElement("div");

		node4.setAttribute("class", "con");

		var nameNodeHeader = document.createElement("h3");

		var nameNode = document.createElement("a");

		nameNode.setAttribute("href", "#");
		nameNode.innerText = name;

		var briefNode = document.createElement("span");

		briefNode.innerText = description;
		
		var span_add_icon = document.createElement("div");
		var add_icon = document.createElement("i");
		add_icon.setAttribute("class", "fas fa-plus");
		add_icon.setAttribute("style", "color: #333333;");
		span_add_icon.setAttribute("style", "float: right; padding-top: 20px; padding-right: 20px;");
		span_add_icon.setAttribute("class", "plus-plus");
		

		nameNodeHeader.appendChild(nameNode);
		
		span_add_icon.appendChild(add_icon);
		node4.appendChild(nameNodeHeader);
		node3.appendChild(span_add_icon);
		node4.appendChild(briefNode);

		//secondary
		var node3_2 = document.createElement("div");

		node3_2.setAttribute("class", "desc2");

		var node4_2 = document.createElement("div");

		node4_2.setAttribute("class", "con2");
		//node4_2.setAttribute("style", "margin: 0 auto; left: 50%");

		var nameNodeHeader_2 = document.createElement("h3");

		var nameNode_2 = document.createElement("a");

		nameNode_2.setAttribute("href", "#");
		nameNode_2.setAttribute("style","font-family:Quicksand, Arial, sans-serif;")
		nameNode_2.innerText = name;

		var briefNode_2 = document.createElement("div");
		briefNode_2.setAttribute("class", "brief-sort");

		briefNode_2.innerText = brief;

		nameNodeHeader_2.appendChild(nameNode_2);
		
		//append briefNode, ratioNode, memberNode, feeNode to node4_2 --> put all info?
		// Read again from db with filter??
		
		//var listing = document.createElement("ul");

		//var newLine = document.createElement("br");

		var memberNode_2 = document.createElement("div");
		var group_icon = document.createElement("i");

		memberNode_2.setAttribute("class", "member-sort");
		group_icon.setAttribute("class",  "fas fa-user-friends");
		
		var ratioNode_2 = document.createElement("div");
		var money_icon = document.createElement("i");

		ratioNode_2.setAttribute("class", "ratio-sort");
		money_icon.setAttribute("class", "fas fa-dollar-sign");

		var feeNode_2 = document.createElement("div");
		var gender_icon = document.createElement("i");

		feeNode_2.setAttribute("class", "fee-sort");
		gender_icon.setAttribute("class", "fas fa-venus-mars");

		memberNode_2.innerText = member;
		ratioNode_2.innerText = ratio;
		feeNode_2.innerText = fee;




		node4_2.appendChild(nameNodeHeader_2);
		
		node4_2.appendChild(briefNode_2);
		//node4_2.appendChild(newLine);
		node4_2.appendChild(group_icon);
		node4_2.appendChild(memberNode_2);
		//node4_2.appendChild(newLine);
		node4_2.appendChild(gender_icon);
		node4_2.appendChild(ratioNode_2);
		//node4_2.appendChild(newLine);
		node4_2.appendChild(money_icon);
		node4_2.appendChild(feeNode_2);

		//node4_2.appendChild(listing);

		node3_2.appendChild(node4_2);

		node3.appendChild(node4);

		node2.appendChild(node3);

		node2.appendChild(node3_2);

		node.appendChild(node2);

		place.appendChild(node);
		//place.insertBefore(node, place.children[1]);
	}


	//Categories Page Category Selection
	var ShowAll = function() {
		if (
		$(".Category_Academic").hasClass("inactive") &&
		$(".Category_Culture").hasClass("inactive") &&
		$(".Category_CommunityService").hasClass("inactive") &&
		$(".Category_Music").hasClass("inactive") &&
		$(".Category_Sports").hasClass("inactive") &&
		$(".Category_Others").hasClass("inactive")
		) {
		$(".Academic").show();
		$(".Culture").show();
		$(".CommunityService").show();
		$(".Music").show();
		$(".Sports").show();
		$(".Others").show();
		}
	};

	$(".Category_Academic").click(function() {
		console.log("academic");
		//inactive -> active
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "blue");
		}
		//active -> inactive
		else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Culture").click(function() {
		console.log("culture");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "red");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_CommunityService").click(function() {
		console.log("community service");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "green");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Music").click(function() {
		console.log("music");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "magenta");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Sports").click(function() {
		console.log("sports");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "purple");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	$(".Category_Others").click(function() {
		console.log("others");
		if ($(this).hasClass("inactive")) {
		$(this).removeClass("inactive");
		$(this).addClass("active");
		$(this).css("color", "orange");
		} else {
		$(this).removeClass("active");
		$(this).addClass("inactive");
		$(this).css("color", "black");
		}
		ShowHide();
		callDefault();
	});

	var ShowHide = function() {
		if ($(".Category_Academic").hasClass("active")) {
		$(".Academic").show();
		} else {
		$(".Academic").hide();
		}

		if ($(".Category_Culture").hasClass("active")) {
		$(".Culture").show();
		} else {
		$(".Culture").hide();
		}

		if ($(".Category_CommunityService").hasClass("active")) {
		$(".CommunityService").show();
		} else {
		$(".CommunityService").hide();
		}

		if ($(".Category_Music").hasClass("active")) {
		$(".Music").show();
		} else {
		$(".Music").hide();
		}

		if ($(".Category_Sports").hasClass("active")) {
		$(".Sports").show();
		} else {
		$(".Sports").hide();
		}

		if ($(".Category_Others").hasClass("active")) {
		$(".Others").show();
		} else {
		$(".Others").hide();
		}
		ShowAll();
	};


	// Filter Buttons
	$(".fas").hover(function(){
		$(this).css("cursor","pointer");
	});
	$(".Member .down").click(function(){
		$(".Member .up .fa-caret-up").css("color","black");
		$(".Member .down .fa-caret-down").css("color","red");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=MemberCount]').is(':checked')) {
			console.log("in member!");
			memberSortDOWN();
		};
	});

	$(".Member .up").click(function(){
		$(".Member .up .fa-caret-up").css("color","green");
		$(".Member .down .fa-caret-down").css("color","black");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=MemberCount]').is(':checked')) {
			console.log("in member!");
			memberSortUP();
		};
		
	})
	$(".Fee .down").click(function(){
		$(".Fee .up .fa-caret-up").css("color","black");
		$(".Fee .down .fa-caret-down").css("color","red");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=Fee]').is(':checked')) {
			console.log("in fee!");
			feeSortDOWN();
		};
		

	})
	$(".Fee .up").click(function(){
		$(".Fee .up .fa-caret-up").css("color","green");
		$(".Fee .down .fa-caret-down").css("color","black");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=Fee]').is(':checked')) {
			console.log("in fee!");
			feeSortUP();
		};
		
	})
	$(".Gender .down").click(function(){
		$(".Gender .up .fa-caret-up").css("color","black");
		$(".Gender .down .fa-caret-down").css("color","red");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=GenderRatio]').is(':checked')) {
			console.log("in ratio!");
			genderSortDOWN();
		};
	})
	$(".Gender .up").click(function(){
		$(".Gender .up .fa-caret-up").css("color","green");
		$(".Gender .down .fa-caret-down").css("color","black");
		//applyFilter();
		if ($('input[type=radio][name=opt][value=GenderRatio]').is(':checked')) {
			console.log("in ratio!");
			genderSortUP();
		};
	})


	function memberSortUP() {
		var listElements = document.querySelectorAll(".single-club");
		
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".member-sort").innerText === b.querySelector('.member-sort').innerText)
				return 0;
			
			if (a.querySelector(".member-sort").innerText <= b.querySelector('.member-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		//only show member-sort
		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").show();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").show();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};

	function feeSortUP() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".fee-sort").innerText === b.querySelector('.fee-sort').innerText)
				return 0;
			
			if (a.querySelector(".fee-sort").innerText <= b.querySelector('.fee-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};


		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").show();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").show();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};


	function genderSortUP() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".ratio-sort").innerText === b.querySelector('.ratio-sort').innerText)
				return 0;
			
			if (a.querySelector(".ratio-sort").innerText <= b.querySelector('.ratio-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").show();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").show();

		callDefault();
	};

	function memberSortDOWN() {
		var listElements = document.querySelectorAll(".single-club");
		
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".member-sort").innerText === b.querySelector('.member-sort').innerText)
				return 0;
			
			if (a.querySelector(".member-sort").innerText >= b.querySelector('.member-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		//only show member-sort
		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").show();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").show();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};


	function feeSortDOWN() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".fee-sort").innerText === b.querySelector('.fee-sort').innerText)
				return 0;
			
			if (a.querySelector(".fee-sort").innerText >= b.querySelector('.fee-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};


		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").show();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").show();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
	};


	function genderSortDOWN() {
		var listElements = document.querySelectorAll(".single-club");
					
		var nodeArray = Array.prototype.slice.call(listElements, 0);
		
		nodeArray.sort(function(a, b) {
			if (a.querySelector(".ratio-sort").innerText === b.querySelector('.ratio-sort').innerText)
				return 0;
			
			if (a.querySelector(".ratio-sort").innerText >= b.querySelector('.ratio-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < nodeArray.length; i++){
			clubs.appendChild( nodeArray[i] );
		};

		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").hide();
		$(".con2").children(".ratio-sort").show();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").hide();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").show();

		callDefault();
	};


	//Filtering categories div
	// This has to work whenever (1) radio changes (2) category filter changes
	function applyFilter() {
       
		$('input[type=radio][name=opt]').change(function() {
			
			

			if (this.value == "MemberCount") {
				console.log("member clicked");
				$(this).prop("checked", true).trigger("click");
				if ($('.m1').css('color') === 'rgb(0, 128, 0)'){
					memberSortUP();
				} else {
					memberSortDOWN();
				}
          		
           } else if (this.value == "Fee") {
				console.log("fee clicked");
				$(this).prop("checked", true).trigger("click");
				if ($(".Fee .up .fa-caret-up").css("color") === 'rgb(0, 128, 0)') {
					feeSortUP();
				} else {
					feeSortDOWN();
				}
			 
			 
           } else if (this.value == "GenderRatio") {
				console.log("genderRatio clicked");
				$(this).prop("checked", true).trigger("click");
				if ($(".Gender .up .fa-caret-up").css("color") === 'rgb(0, 128, 0)') {
					genderSortUP();
				} else {
					genderSortDOWN();
				}
           }
		});
    };

	
	$(document).ready(function(){
		
		applyFilter();
	
	});




	//Click on ADD 
	//






	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
			

			

		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.

	function callDefault() {
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		//stickyFunction();
		owlCrouselFeatureSlide();
	};


	readClubInfo(function() {
		
		callDefault();

		$("input[type=radio][name=opt][value=MemberCount]").prop("checked", true).trigger("click");

		var listElements = document.querySelectorAll(".single-club");
				
		var nodeArray = Array.prototype.slice.call(listElements, 0);

		var mapped = nodeArray.map(function(el, i) {
			return { index: i, value: el };
		});

		
		
		mapped.sort(function(a, b) {
			if (a.value.querySelector(".member-sort").innerText === b.value.querySelector('.member-sort').innerText)
				return 0;
			
			if (a.value.querySelector(".member-sort").innerText <= b.value.querySelector('.member-sort').innerText) {
				// b comes before a
				return 1;
			}
			return -1;
		});

		var changed_ind = mapped.map(function(el) {
			return el.index;
		});


		console.log(changed_ind);

		//render children of '#clubs' to be the same as nodeArray
		var clubs = document.getElementById('clubs');
		clubs.innerHTML = ' ';
		for (var i=0; i < mapped.length; i++){
			clubs.appendChild(mapped[i].value);
		};

		$(".con2").children(".brief-sort").show();
		$(".con2").children(".member-sort").show();
		$(".con2").children(".ratio-sort").hide();
		$(".con2").children(".fee-sort").hide();

		$(".con2").children(".fa-user-friends").show();
		$(".con2").children(".fa-dollar-sign").hide();
		$(".con2").children(".fa-venus-mars").hide();

		callDefault();
		
	});

	readQNA(function(){
		callDefault();
	});



	//click on club --> modal 
	$(document).on('click', '.project .desc ', function(event) {


		var myModal = $(this).data('target');

		$('.modal .modal-dialog .modal-content .modal-header h5').text( $(this).children()[1].querySelectorAll('a')[0].innerText);

		$(myModal).modal('show');
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});





	//db function 
	function writeToMyPage(name) {
		var newKey = firebase.database().ref('/MyPageDemo/').push();
		newKey.set({
			name: name
	})};


	//add club to MyPage DB + other functions
	$('.club-add').click(function() {
		console.log("ADDED");

		//write to db
		console.log($('.modal-title')[0].innerText);
		writeToMyPage($('.modal-title')[0].innerText);


		//hide the div element



		//alert that club has been added

		//re-render categories
	});
	


}());
