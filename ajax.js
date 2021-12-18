class SajatAjax{
    constructor(){
       }        

       /*GET - ADATOK LEKÉRÉSE*/
      //apiVegpont: ahol megkapja a szervertől (ill. azon keresztül az adatbázistól) a (frissített ill. adott esetben szűrt) adatokat
    getAjax(apiVegpont, tomb, myCallback) {
       tomb.splice(0,tomb.length); //tömb ürítése, hogy többszöri lefutáskor ne legyen hozzáfűzés
       $.ajax({
         url: apiVegpont,
         type: "GET",     //GET metódussal lekéri az adatokat az API végpontról, és egy result tömbbe teszi
         success: function (result) {
           result.forEach((element) => { 
             tomb.push(element);   //a result összes elemét beletöltjük egy tömbbe
           });
           myCallback(tomb);   //ha a tömb már teljesen feltöltődött, átadható paraméterként egy függvénynek
         },
       });
     }


     /*POST - új adat felvitele az AB-ba API végponton keresztül*/
     postAjax(apiVegpont,ujAdat) {
        $.ajax({
          url: apiVegpont,
          type: "POST",
          data: ujAdat,
          success: function (result) {
            console.log('sikerult');
          },
        });
      }
    
      /*DELETE - adott id-jú adat törlése az AB-ból API végponton keresztül*/
      deleteAjax(apiVegpont,id) {
        $.ajax({
          url: apiVegpont+"/"+id,
          type: "DELETE",    
          success: function (result) {
            console.log('sikerult');
          },
        });
      }
    
      /*PUT - dott id-jú adat módosítása az AB-ban API végponton keresztül*/
      putAjax(apiVegpont,ujAdat,id) {
        $.ajax({
          url: apiVegpont+"/"+id,
          type: "PUT",  
          data: ujAdat,  
          success: function (result) {
            console.log('sikerult');
          },
        });
      }
    

    }
