import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./Icar";

//url for the rest webservice at Azure
let carWebUrl: string = "https://webapicar20190326034339.azurewebsites.net/api/cars/";

let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsContent");
let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");

GetAllCarsButton.addEventListener('click',showAllCars);


function showAllCars():void{

    axios.get<ICar[]>(carWebUrl)
    .then(function (response: AxiosResponse<ICar[]>) : void
    {
        console.log("are in then");
        console.log(response);    

        //remove all the li elements one by one
        while (ContentElement.firstChild) {
            ContentElement.removeChild(ContentElement.lastChild);
        }

        response.data.forEach((car: ICar) => {
                let newNode:HTMLLIElement = AddLiElement(car.model + " " +car.vendor+ " "+car.price);
                ContentElement.appendChild(newNode);
        });
    })
    .catch(function (error:AxiosError) : void{
                    console.log("Error in the typescript code");
                    console.log(error);
                }
        )
    
    console.log("At the end in the showAllCars function");
}

/**
 * Returns a new HTMLLIElement with the text specified in the text param
 * @param text text for the li node
 */
function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
            // list.appendChild(newLi);
    return newLi;
}

// showAllCars();
