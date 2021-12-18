class Task{
    constructor(node, adat) {
        this.node = node;
        this.adat=adat;        
        this.taskNev = this.node.children(".tasknev");
        this.taskLeiras = this.node.children(".taskleiras");
        this.taskHatarido = this.node.children(".taskadatok").children(".hatarido");
        this.taskElkeszito = this.node.children(".taskadatok").children(".elkeszito_neve");
        this.taskAllapot = this.node.children(".taskadatok").children(".allapot");
        this.taskTorles = this.node.children("#gombok").children(".torles").children("button");
        this.taskModositas = this.node.children("#gombok").children(".modositas").children("button");
        this.setAdat(this.adat);

        this.taskTorles.on("click ", () => {
            this.esemenyInfoAtad("torles"); //a főablaknak átadom az eseményt kiváltó obj. adatait; a rekord melletti Törlés gomb kattintáseseménye

        });
        this.taskModositas.on("click ", () => {
            this.esemenyInfoAtad("modositas"); //a főablaknak átadom az eseményt kiváltó obj. adatait; a rekord melletti Módosít gomb kattintáseseménye

        });
    }
        setAdat(adat) {  //a sablon gyerekelemeinek feltöltése adatokkal, melyek példányosításkor a tömb egy elemének kulcsonkénti értékei lesznek
            this.adat = adat;  //"adat" itt a paraméterként bejövő tömbobjektumra mutat     
            this.taskNev.text(adat.nev);
            this.taskLeiras.text(adat.leiras);
            this.taskHatarido.text(adat.hatarido);
            this.taskElkeszito.text(adat.elkesziti);
            this.taskAllapot.text(adat.allapot);
            
        }
        esemenyInfoAtad(esemenyneve) {
            //console.log(this.adat);
            let esemeny = new CustomEvent(esemenyneve, {
    
                detail: this.adat, //ezzel adatokat tudok átadni
            });
            window.dispatchEvent(esemeny); // A főablakhoz adom az eseményt,
            //Az eseményt majd a többi js-ben (script.js) el tudom kapni.
        }
    
   


}