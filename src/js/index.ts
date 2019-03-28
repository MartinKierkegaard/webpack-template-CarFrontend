import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./Icar";

//url for the rest webservice at Azure
let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars/";

let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");

GetAllCarsButton.addEventListener('click',showAllCars);

let AddCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddCarButton.addEventListener('click',addCar);

let deleteCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
deleteCarButton.addEventListener('click',deleteCar);

/**
 * Function thats deletes a car 
 * This function is triggered then the click event is fired from the deleteButton
 */
function deleteCar():void{

    //finds the id for the car to delete
    let delCarIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("deleteCarId");
    let myCarId : number = +delCarIdElement.value;
    
    let deleteContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("deletecontent");

    
    //http delete request with one parameter(params) id that is set to myCarId
    axios.delete("https://webapicar20190326034339.azurewebsites.net/api/cars/"+myCarId
        )
        .then(function (response :  AxiosResponse): void{
                console.log("Bilen er slettet");
                console.log("Statuskoden er :" + response.status);
                deleteContentElement.innerHTML = "bilen er slettet";
        })
        .catch(
            function (error:AxiosError) : void{                          
                console.log(error);
                deleteContentElement.innerHTML = "Fejl: bilen er IKKE slettet, se i console";
            });

}

function addCar():void{
    let addModelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addModel");
    let addVendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addVendor");
    let addPriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice");

    let myModel : string = addModelelement.value;
    let myVendor: string = addVendorelement.value;
    let myPrice : number = +addPriceelement.value;  

    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars",
                    {model:myModel,vendor:myVendor,price:myPrice})
                    .then(function (response :  AxiosResponse): void
                    {
                        console.log("Statuskoden er :" + response.status);
                    })
                    .catch(
                        function (error:AxiosError) : void{                          
                            console.log(error);
                        }
                    )
                    

}

function showAllCars():void{

    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function (response: AxiosResponse<ICar[]>) : void
    {
        console.log("Er i then");
        console.log(response);

        let result: string = "<ol>" 

        response.data.forEach((car: ICar) => {
            result += "<li>"+ car.model + " " +car.vendor+ " "+car.price  +"</li>"
        });
        result += "</ol>"

        ContentElement.innerHTML= result;
        
    })
    .catch(
        function (error:AxiosError) : void{
            console.log("Error I min kode");
            console.log(error);

        }
    )
    
    console.log("Er i slutningen af showAllCars function");
}



// showAllCars();
