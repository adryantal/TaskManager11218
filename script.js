$(function () {

    const taskTomb = [];
    let apiVegpont = "http://localhost:3000/taskok";
    const sajatAjax = new SajatAjax();
  
    sajatAjax.getAjax(apiVegpont,taskTomb, taskLista);

    /*TASKOK MEGJELENÍTÉSE (index.html)*/
  function taskLista(tomb) {                 
    const szuloElem = $('#taskkontener');
    const sablonElem = $('.sablonhoz .task'); //a .sablonhoz alatti .task lesz az új sablonelem, a multiplikálódás elkerülése végett
    szuloElem.empty();                        //szülőelem ürítése, hogy többszöri lefutáskor ne legyen hozzáfűzés
    sablonElem.show();    
    tomb.forEach(function (elem) {                
      let node = sablonElem.clone().appendTo(szuloElem) //
      const obj = new Task(node, elem) 
    })
    //sablonElem.remove() //sablonelem eltávolítása
   sablonElem.hide();   
  }

/*ÚJ REKORD RÖGZÍTÉSE*/
$("#beszur").on("click",()=>{
    let ujadat={      
        "nev": $("#inputTaskNev").val(),
        "leiras": $("#inputTaskLeiras").val(),            
        "allapot": $("#inputTaskAllapot").val(),
        "hatarido": $("#inputTaskHatarido").val(),
        "elkesziti": $("#inputElkeszito").val(),
    }
    sajatAjax.postAjax(apiVegpont, ujadat);
 });

/*REKORD TÖRLÉSE GOMBBAL*/
 $(window).on("torles",(event)=>{      
    let id=event.detail.id;
    //console.log(id);
    sajatAjax.deleteAjax(apiVegpont, id);
});

  /*REKORD MÓDOSÍTÁSA FORMON KERESZTÜL*/
    //módosítandó rekord adatainak betöltése a formba:
    $(window).on("modositas",(event)=>{  
        //ha a "modositas" esemény bekövetkezett, tehát a rekord melletti Módosít gombra kattintottunk      
        $("#modTaskID").val(event.detail.id);
        $("#modTaskNev").val(event.detail.nev);
        $("#modTaskLeiras").val(event.detail.leiras);
        $("#modTaskAllapot").val(event.detail.allapot);
        $("#modTaskHatarido").val(event.detail.hatarido);
        $("#modElkeszito").val(event.detail.elkesziti);
    });
$("#modosit_form").on("click",()=>{
    let id=  $("#modTaskID").val(); 
    console.log(id);
    let ujAdat={  
         "id": id,          
         "nev": $("#modTaskNev").val(),
         "leiras": $("#modTaskLeiras").val(),            
         "allapot": $("#modTaskAllapot").val(),
         "hatarido": $("#modTaskHatarido").val(),
         "elkesziti": $("#modElkeszito").val(),
    }
    sajatAjax.putAjax(apiVegpont,ujAdat,id);
 });

 
  /*RENDEZÉSESEMÉNY LEGÖRDÜLŐ LISTÁVAL*/
  $("#rendezes").on("change",()=>{
    let kivOpcio = $( "#rendezes" ).val();
    //console.log(kivOpcio);
    let rendez;
    if (kivOpcio=="hat_novekvo"){
     rendez="?_sort=hatarido&_order=asc"};
     if (kivOpcio=="hat_csokk"){
      rendez="?_sort=hatarido&_order=desc"};
     
    let filtered=apiVegpont+rendez; //szűrési feltétel hozzáadása az API végpont útvonalához
    sajatAjax.getAjax(filtered, taskTomb, taskLista); //szűrt adatok lekérése, megjelenítése 
 });

 /*KERESÉS név szerint - szövegmezőből direktben*/
$("#keresnev").on("input",()=>{
    let szoveg=$("#keresnev").val();
    //console.log(szoveg);
    const feltetel="?nev_like="+szoveg;
    let filtered=apiVegpont+feltetel; ///szűrési feltétel hozzáadása az API végpont útvonalához
    sajatAjax.getAjax(filtered, taskTomb, taskLista); //szűrt adatok lekérése, megjelenítése 
   });
  
    /*KERESÉS leírás szerint - szövegmezőből direktben*/
$("#keresleiras").on("input",()=>{
    let szoveg=$("#keresleiras").val();
    //console.log(szoveg);
    const feltetel="?leiras_like="+szoveg;
    let filtered=apiVegpont+feltetel; ///szűrési feltétel hozzáadása az API végpont útvonalához
    sajatAjax.getAjax(filtered, taskTomb, taskLista); //szűrt adatok lekérése, megjelenítése 

   });







        /*KERESÉS feltétel szerint - legördülő listából + szövegmezőből direktben*/
       
         
       
   $("#keresesi_szempont").on("change",()=>{
      
        szempont = $( "#keresesi_szempont" ).val();
       console.log(szempont);          
             
      $("#keresfeltetelszerint").keyup(()=>{     
           
       let szoveg=$("#keresfeltetelszerint").val();
      let feltetel="?"+szempont+"_like="+szoveg;         
      let filtered = apiVegpont+feltetel; ///szűrési feltétel hozzáadása az API végpont útvonalához       
       console.log(filtered); 
     
       sajatAjax.getAjax(filtered, taskTomb, taskLista); //szűrt adatok lekérése, megjelenítése      
       
     
     
      });
      
     
        
   });


   


         
    
        

  


})