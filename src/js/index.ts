import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./Icar";


let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");

GetAllCarsButton.addEventListener('click',showAllCars)

function showAllCars():void{

    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function (response: AxiosResponse<ICar[]>) : void
    {
        console.log("Er i then");
        console.log(response);

        let result: string = "<ol>" 

        response.data.forEach((car: ICar) => {
            result += "<li>"+ car.model + " " +car.vendor+ " "+car.id  +"</li>"
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



showAllCars();
