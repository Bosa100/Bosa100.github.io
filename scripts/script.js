$(document).ready(function() {
	var $navLinks = $("nav a"),
	$hoverArea = $(".hover-over"),
	$hidden = $("#top"),
	$nav = $("nav"),
	$menu = $("#menu"),
	$iFrame = $("iframe"),
	$websiteLink = $('#link'),
	$scrollTag,
	currentProject,
	projects = ["https://codepen.io/Bosa100/full/LLVLJW/", "https://codepen.io/Bosa100/full/pPKyJv/", "https://codepen.io/Bosa100/full/XRZppv/", 
				"https://codepen.io/Bosa100/full/BRYLEy/", "https://codepen.io/Bosa100/full/dWBYmB/","http://cpscserv.dom.edu/students/salcbrau/CPSC_280/A5/index.html", 
				"https://codepen.io/Bosa100/full/yJwbEE/", "https://codepen.io/Bosa100/full/ZKGWXB/", "https://codepen.io/Bosa100/full/oWodrr/"];

	$navLinks.hover(
		function() {
			$(this).animate({ color: "#968d8d" }, 200);
		},
		function() {
			$(this).animate({ color: "white" }, 200);
		}
	);
  
	$navLinks.click(function() {
		scrollTo(this.id);
	});

	$hoverArea.mouseover(function() {
		$(this).addClass("over");
	});

	$hoverArea.mouseout(function() {
		$(this).removeClass("over");
	});

	$hoverArea.hover(
		function() {
			hoverIn($(this));
		},
		function() {
			hoverOut($(this));
		}
	);

	$hoverArea.click(function() {
		$iFrame.attr("src", projects[parseInt(this.id)]);
		currentProject = parseInt(this.id);
		$websiteLink.attr('href', projects[parseInt(this.id)]);
		$hidden.show();
		$hidden.animate({ backgroundColor: "rgba(0, 0, 0, 0.9)" }, 300);
		$nav.animate({ opacity: 0.1 }, 350);
		setTimeout(function() {
			$menu.animate({ opacity: 1 }, 500);
		}, 250);
	});

	$("button").click(function() {
		switch (this.id) {
			case "prev":
				if (currentProject === 0) currentProject = 8;
				else currentProject--;
				updateFrame();
				break;
			case "next":
				if (currentProject === 8) currentProject = 0;
				else currentProject++;
				updateFrame();
				break;
			case "close":
				closeHidden();
				break;
			default:
		}
	});

	function updateFrame() {
		$iFrame.fadeTo(300, 0);
		setTimeout(function() {
			$iFrame.attr("src", projects[currentProject]);
			$websiteLink.attr('href', projects[currentProject]);
			setTimeout(function() {
				$iFrame.fadeTo(300, 1);
			}, 500);
		}, 350);
	}

	function hoverIn(current) {
		if (current.hasClass("allowed")) {
			current.animate({ backgroundColor: "rgba(0, 0, 0, 0.7)" , opacity: 1 }, 350);
			current.removeClass("allowed");
		}
	}

	function hoverOut(current) {
		current.animate({ backgroundColor: "rgba(0, 0, 0, 0)" , opacity: 0 }, 350);
		current.unbind("mouseenter mouseleave");
		setTimeout(function() {
			current.addClass("allowed");
			setTimeout(function() {
				current.hover(function() { hoverIn($(this)); }, function() { hoverOut($(this)); });
				if (current.hasClass("over")) {
					hoverIn(current);
				}
			}, 100);
		}, 350);
	}

	function closeHidden() {
		$menu.animate({ opacity: 0 }, 500);
		setTimeout(function() {
			$hidden.animate({ backgroundColor: "rgba(0, 0, 0, 0)" }, 500);
			$nav.animate({ opacity: 1 }, 500);
			setTimeout(function() {
				$hidden.hide();
				$iFrame.attr("src", "about:blank");
			}, 500);
		}, 300);
	}
  
	function scrollTo(place) {
		$scrollTag = $("a[name='" + place + "']");
		$('html, body').animate({scrollTop: $scrollTag.offset().top}, 650);
	}
});