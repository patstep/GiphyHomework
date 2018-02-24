// Array of available car buttons
const carsArray = [
	"Camaro", "Charger", "Corvette", "Mustang", "Prius", "jalopy", "Wienermobile"
];



//creates a button for items in the array
function createBtn() {
	$("#buttonBar").empty();
	for (let i = 0; i < carsArray.length; i++) {
		const newBtn = $("<span class='inputButton carBtn'>");
		newBtn.attr("data-name", carsArray[i]);
		newBtn.text(carsArray[i]);
		$("#buttonBar").append(newBtn); //appends the new category button into the button bar section
	}
}


$(document).ready(function() {
	createBtn();
	$("#submitBtn").click(function() {  //When the submit button is clicked...
		const newCategory = $("#newCategory").val();
		carsArray.push(newCategory); //a new category button is created
		createBtn(); 
	})

	$(document).on("click", ".carBtn", function() {
		const value = $(this).data("name");
		displayGifs(value);
	})

	$(document).on("click", ".carGif", function() {

		const animate = $(this).attr("data-animate");
		const still = $(this).attr("data-still");
		const state = $(this).attr("data-state");
		if (state === "still") {	//Animates the GIF when clicked
			$(this).attr("src", animate);
			$(this).attr("data-state", "animated");
		} else {
			$(this).attr("src", still);
			$(this).attr("data-state", "still");
		}

	})


//Function to retrieve 10 static GIFs when a button is clicked
function displayGifs(clicked) {
	$("#displaySection").empty();
	const search = clicked;
	const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=onmHF6xxNJXDAZi6HT8Pm9xJ2hTA8zC7&q=" + search + "&limit=10"; //limits to 10
	$.ajax({
		url: queryURL,
		medthod: "GET"
	}).done(function(response) {
		for (let i = 0; i < response.data.length; i++) {
			const newDiv = $("<div class='gifsDisplay'>");
			const rating = $("<p>");
			const newImg = $("<img data-state='still' class='carGif'>");
			rating.text("Rating: " + response.data[i].rating);
			newImg.attr("src", response.data[i].images.fixed_height_still.url);
			newImg.attr("data-still", response.data[i].images.fixed_height_still.url)
			newImg.attr("data-animate", response.data[i].images.fixed_height.url)
			newDiv.append(rating, newImg);
			$("#displaySection").append(newDiv);
		}
	})
}

})