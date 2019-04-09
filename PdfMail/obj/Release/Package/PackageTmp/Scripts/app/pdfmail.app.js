;
(function ($, jsPdf, toast, progress) {

	function generatePdf(message) {
        var doc = new jsPDF('p', 'mm', [297, 210]);
        var pageWidth = 210,
            lineHeight = 2.5,
            margin = 20,
            maxLineWidth = pageWidth - margin * 2,
            fontSize = 12,
            ptsPerInch = 32,
            oneLineHeight = fontSize * lineHeight / ptsPerInch;

       // pulling form values
        var firstname = document.getElementById('first_name').value;
        var lastname = document.getElementById('last_name').value;
        var email = document.getElementById('email').value;
        var travel_purpose = document.getElementById('travel_purpose').value;
        var other_purpose = document.getElementById('other_purpose').value;

        //faculty and staff stuff
        var facstaff;
        var Participation = "N/A";
        var previoustravel = "N/A";
        if (document.getElementById("staff_button").checked == true) {
            facstaff = "Staff";
        }
        else {
            facstaff = "Faculty";

            if (document.getElementById("parti").checked == true) {
                Participation = "Yes";
            }
            else
                Participation = "No";

            if (document.getElementById("travel_previous").checked == true) {
                previoustravel = "Yes";
            }
            else if (document.getElementById("travel_previous_idk").checked == true) {
                previoustravel = "I don't know";
            }
            else
                previoustravel = "No";
        }
        var Deptchair = document.getElementById('departchair_name').value;
        var dept = document.getElementById('department').value;

        //travel information
        var address = document.getElementById('address').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('states').value;
        var country = document.getElementById('Country').value;
        var zip = document.getElementById('zip_code').value;
        var startdate = document.getElementById('travelstart_date').value;
        var enddate = document.getElementById('travelend_date').value;

        //personal travel
        var personaltravel;
        var personalstartdate; 
        var personalenddate; 
        if (document.getElementById("personal_travel_NO").checked == true) {
            personaltravel = "NO";
            var personalstartdate = "N/A";
            var personalenddate = "N/A";
        }
        else {
            personaltravel = "YES";
            var personalstartdate = document.getElementById('personal_date_start').value;
            var personalenddate = document.getElementById('personal_end_date').value;
        }

        //Travel expenses
        var accnumber = document.getElementById('account_number').value;
        var cardpayment;
        if (document.getElementById("card_payed").checked == true) {
            cardpayment = "YES";
        }
        else {
            cardpayment = "NO";
            
        }

        var airfare = document.getElementById('airfare_expense').value;
        var personalfare = document.getElementById('personal_expense').value;
        var lodging = document.getElementById('lodging_expense').value;
        var meal = document.getElementById('meal_expense').value;
        var redgexpense = document.getElementById('registration_expense').value;
        var misci = document.getElementById('misci_expense').value;
        var total = document.getElementById('total_expense').value;

        //notes and comments

        var comments = document.getElementById('comment').value;

        //Header
        doc.setFillColor(9, 48, 81)
        doc.rect(0, 0, 270, 10, 'F')

        // Titel
        doc.setFont('helvetica')
        doc.setFontType('normal')
        doc.setFontSize(18);
        doc.setTextColor(5, 73, 140);
        doc.text('Westminster College', margin + 50, 20);

        //
        doc.setFontSize(14);
        doc.setTextColor(5, 73, 140);
        doc.text('Travel Request for Faculty or Staff Travel', margin + 30, 28);


        //Requesters information
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setFontType('bold');
        doc.text("Requestor's Information:", margin, 40);

        // first and last name
        doc.setFontType('bold')
        doc.text("Full Name:", margin + 10, 46);

        doc.setFontType('normal')
        doc.text(firstname + " " + lastname, margin + 30, 46);

        //Email
        doc.setFontType('bold')
        doc.text("Email:", margin + 75, 46);

        doc.setFontType('normal')
        doc.text(email, margin + 87, 46);


        // travel purpose
        doc.setFontType('bold')
        doc.text("Travel Purpose:", margin + 10, 52);

        doc.setFontType('normal')
        doc.text(travel_purpose, margin + 35, 52);

        doc.setFontType('normal')
        doc.text(other_purpose, margin + 65, 52);

       // facstaff 
        doc.setFontType('bold')
        doc.text("Faculty/Staff:", margin + 10, 58);

        doc.setFontType('normal')
        doc.text(facstaff, margin + 35, 58);

        //Faculty only - will you be an active participant in this event? (giving a paper, serving on a panel etc.)
        doc.setFontType('bold')
        doc.text("Will you be an active participant in this event?", margin + 10, 64);

        doc.setFontType('normal')
        doc.text(Participation, margin + 85, 64);

        //Faculty only - will you be an active participant in this event? (giving a paper, serving on a panel etc.)
        doc.setFontType('bold')
        doc.text("Have you received previous travel support for this fiscal year?", margin + 10, 70);

        doc.setFontType('normal')
        doc.text(previoustravel, margin + 110, 70);

        //Department and Supervisor
        doc.setFontType('bold')
        doc.text("Department Chair:", margin + 10, 76);

        doc.setFontType('normal')
        doc.text(Deptchair, margin + 40, 76);

        doc.setFontType('bold')
        doc.text("Department:", margin + 90, 76);

        doc.setFontType('normal')
        doc.text(dept, margin + 110, 76);

        //Travel infromation
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setFontType('bold');
        doc.text("Travel Information:", margin, 86);

        // address
        doc.setFontType('bold')
        doc.text("Address:", margin + 10, 92);

        doc.setFontType('normal')
        doc.text(address, margin + 30, 92);

        doc.setFontType('normal')
        doc.text(city + ", " + state + " " + zip + ", " + country, margin + 30, 98);

        //travel start date
        doc.setFontType('bold')
        doc.text("Travel start date:", margin + 10, 104);

        doc.setFontType('normal')
        doc.text(startdate, margin + 40, 104);

        //travel end date
        doc.setFontType('bold')
        doc.text("Travel end date:", margin + 10, 110);

        doc.setFontType('normal')
        doc.text(enddate, margin + 40, 110);

        //Is any personal travel included with this trip?
        doc.setFontType('bold')
        doc.text("Is any personal travel included with this trip?", margin + 10, 116);

        doc.setFontType('normal')
        doc.text(personaltravel, margin + 80, 116);

        //travel end date
        doc.setFontType('bold')
        doc.text("Start Date of Personal Time:", margin + 10, 122);

        doc.setFontType('normal')
        doc.text(personalstartdate, margin + 60, 122);

        //travel end date
        doc.setFontType('bold')
        doc.text("End Date of Personal Time:", margin + 10, 128);

        doc.setFontType('normal')
        doc.text(personalenddate, margin + 60, 128);

        //travel expenses
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setFontType('bold');
        doc.text("Travel Expenses Estimate:", margin, 138);
        //account number
        doc.setFontType('bold')
        doc.text("Account number to use for charges:", margin + 10, 144);

        doc.setFontType('normal')
        doc.text(accnumber, margin + 74, 144);

        //cardpayment
        doc.setFontType('bold')
        doc.text("Will a College purchasing card be used for this travel?", margin + 10, 150);

        doc.setFontType('normal')
        doc.text(cardpayment, margin + 110, 150);
        //airfare
        doc.setFontType('bold')
        doc.text("Airfare expenses:", margin + 10, 156);

        doc.setFontType('normal')
        doc.text("$" + airfare, margin + 74, 156);

        //personal fare
        doc.setFontType('bold')
        doc.text("Personal auto expense:", margin + 10, 162);

        doc.setFontType('normal')
        doc.text("$" + personalfare, margin + 74, 162);

        //lodging 
        doc.setFontType('bold')
        doc.text("Lodging expense:", margin + 10, 168);

        doc.setFontType('normal')
        doc.text("$" + lodging, margin + 74, 168);

        //Meal expense
        doc.setFontType('bold')
        doc.text("Meal expense:", margin + 10, 174);

        doc.setFontType('normal')
        doc.text("$" + meal, margin + 74, 174);

        //Registration and fees expense
        doc.setFontType('bold')
        doc.text("Registration and fees expense:", margin + 10, 180);

        doc.setFontType('normal')
        doc.text("$" + redgexpense, margin + 74, 180);

        //Miscellaneous
        doc.setFontType('bold')
        doc.text("Miscellaneous:", margin + 10, 186);

        doc.setFontType('normal')
        doc.text("$" + misci, margin + 74, 186);

        //Total estimated expense of this trip:
        doc.line(margin + 10, 192, margin + 60, 192);
        doc.setFontType('normal')
        doc.line(margin + 74, 192, margin + 90, 192);

        //Total estimated expense of this trip:
        doc.setFontType('bold')
        doc.text("Total estimated expense of this trip:", margin + 10, 200);

        doc.setFontType('bold')
        doc.text("$" + total, margin + 74, 200);

        //notes and comments
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setFontType('bold');
        doc.text("Notes and comments:", margin, 210);

        //comments
        doc.setFontType('normal')
        doc.text(doc.splitTextToSize(comments, 150), margin + 10, 216);

        //// Date
        var currentDate = new Date(),
            currentDay = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate(),
            currentMonth = currentDate.getMonth() < 9 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);

        doc.setFontType('bold')
        doc.setFontSize(12);
        doc.setTextColor(204,0, 0);
        var date = currentDay + '.' + currentMonth + '.' + currentDate.getFullYear();
        doc.text("Date Submitted: ", margin + 50, 236);
        doc.text(date, margin + 80, 236);

		var binary = doc.output();
		return binary ? btoa(binary) : "";

	}

	$(document).ready(function () {
		$(document).on("submit", "#mail-pdf", function (e) {
			//prevent the form from doing a submit
			e.preventDefault();
			var formStatus = $("#mail-pdf")[0].checkValidity();
			if (!formStatus)
				return;
			var mailTo = $("#email");
			var mailMessage = $("#mail-message");

			var pdfData = generatePdf(mailMessage.val());
			if (!pdfData)
				return;
            var FRSNAME = document.getElementById('first_name').value;
            var LSTNAME = document.getElementById('last_name').value;
			//Indicate progress
			progress.start();


			var reqData = {
				to: mailTo.val(),
                attachment: pdfData,
                first: FRSNAME,
                last:LSTNAME
			};

			$.ajax({
				url: "Home/Export",
				data: JSON.stringify(reqData),
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				success: function (response) {
					progress.done();

					if (response.result === "success") {

						mailMessage.val("");
						mailTo.val("");

                        toast.success("Mail send succesfully! Please check your inbox to view a copy of this voucher. Thank you!");

                        //reset the form
                        $("#mail-pdf")[0].reset();

                        //scroll to top
                        $(window).scrollTop(0);
					}
					else
						toast.error("There seems to be a problem, Please try again!");

				},
				error: function () {
					progress.done();
					toast.error("Error in communicating with server!");
				}
			});
		});
	});
})(jQuery, jsPDF, toastr, NProgress);


function sum_expenses() {

    var airfare_expense = parseFloat(document.getElementById('airfare_expense').value);
    var personal_auto_expense = parseFloat(document.getElementById('personal_expense').value);
    var lodging_expense = parseFloat(document.getElementById('lodging_expense').value);
    var meal_expense = parseFloat(document.getElementById('meal_expense').value);
    var redgestration_expense = parseFloat(document.getElementById('registration_expense').value);
    var misc_expense = parseFloat(document.getElementById('misci_expense').value);
    var total_expenses = parseFloat(Number(airfare_expense + personal_auto_expense + lodging_expense + meal_expense + redgestration_expense + redgestration_expense + misc_expense).toFixed(2));

    document.getElementById('total_expense').value = total_expenses;

}


function showform() {
    if (document.getElementById("staff_button").checked == true) {
        document.getElementById("support1").style.visibility = "hidden";
        document.getElementById("support2").style.visibility = "hidden";
        document.getElementById("support1").style.display = "none";
        document.getElementById("support2").style.display = "none";

    }
    else {
        document.getElementById("support1").style.visibility = "visible";
        document.getElementById("support2").style.visibility = "visible";
        document.getElementById("support1").style.display = "block";
        document.getElementById("support2").style.display = "block";
    }
}

function otherPurpose() {
    if (document.getElementById("travel_purpose").selectedIndex == "4") {
        document.getElementById("travel_textbox").style.visibility = "visible";
        document.getElementById("travel_textbox").style.display = "block";
    }
    else {
        document.getElementById("travel_textbox").style.visibility = "hidden";
        document.getElementById("travel_textbox").style.display = "none";
    }
}



function setTwoNumberDecimal(el) {

    if (el.value == "") {
        el.value = "0.00"
    }
    else {
        el.value = parseFloat(el.value).toFixed(2);
    }
}


function personal_travel_date() {
    if (document.getElementById("personal_travel_NO").checked == true) {
        document.getElementById("personal_travel_dates").style.visibility = "hidden";
        document.getElementById("personal_travel_dates").style.display = "none";
    }
    else if (document.getElementById("travel_personal").checked == true) {
        document.getElementById("personal_travel_dates").style.visibility = "visible";
        document.getElementById("personal_travel_dates").style.display = "block";
    }
    else {
        document.getElementById("personal_travel_dates").style.visibility = "hidden";
        document.getElementById("personal_travel_dates").style.display = "none";

    }
}