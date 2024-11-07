// let baseUrl=`http://localhost:5000`
// let btnBook=document.getElementById("book_appointment");
// btnBook.addEventListener("click",()=>{
//     let date=document.getElementById("inputdate").value;
//     let slot=document.getElementById("slot-select").value;
//     let token=sessionStorage.getItem("token");
//     let name=sessionStorage.getItem("name");
//     let trainerId=sessionStorage.getItem("trainerId");
//     if(!token){
//         alert("Please login first to book an appointment!")
//         window.location.href="./Login.html"
//     }else if(date==""||slot==""){
//         alert("Please fill all the fields")
//     }else{
//        let obj={
//         trainerId:trainerId,
//         bookingDate:date,
//         bookingSlot:slot
//        }
//        bookAnAppointment(obj,token,name);
//     }
    
// })

// async function bookAnAppointment(obj,token,name){

//     try {
//         let res=await fetch(`${baseUrl}/booking/create`,{
//          method:'POST',
//          headers:{
//              'Content-type':'application/json',
//              Authorization:`${token}`
//          },
//          body:JSON.stringify(obj)
//         })
//         let out=await res.json();
//         //console.log(out);
//         if(out.msg=="This slot is not available"){
//          alert("This slot is not available")
//         }else if(out.msg=="New booking created successfully"){
//          alert(`Hi ${name}, your booking is confirmed on ${obj.bookingDate}`)
//         }else{
//          alert("Something went wrong!")
//         }
//      } catch (error) {
//          console.log("err",error)
//          alert("Something went wrong!")
//      }
// }




// import * as dotenv from 'dotenv';

// dotenv.config();

// const baseUrl = process.env.BASE_URL;

const baseUrl = 'http://localhost:5000';

const btnBook = document.getElementById("book_appointment");

btnBook.addEventListener("click", () => {
  const date = document.getElementById("inputdate").value;
  const slot = document.getElementById("slot-select").value;
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const trainerId = sessionStorage.getItem("trainerId");

  if (!token) {
    alert("Please login first to book an appointment!");
    window.location.href = "./Login.html";
  } else if (date === "" || slot === "") {
    alert("Please fill all the fields");
  } else {
    const appointmentDetails = {
      trainerId: trainerId,
      bookingDate: date,
      bookingSlot: slot
    };
    bookAnAppointment(appointmentDetails, token, name);
  }
});

async function bookAnAppointment(appointmentDetails, token, name) {
  try {
    const response = await fetch(`${baseUrl}/booking/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      },
      body: JSON.stringify(appointmentDetails)
    });

    const result = await response.json();

		console.log(result);
		
    if (response.status === 409 || result.message === "This slot is not available") {
      alert("This slot is not available");
    } else if (response.ok) {
      alert(`${name}, your booking is confirmed on ${appointmentDetails.bookingDate}`);
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
}
