const noteFormView = {
    display() {
        document.getElementById("noteForm").classList.remove("create_edit_note-hidden");
        document.getElementById("form_add_note_valid").addEventListener("click",noteFormView.validate);
    },
    hide(){
        document.getElementById("noteForm").classList.add("create_edit_note-hidden");
    },
    validate(){
        let titre = document.getElementById("form_add_note_title").value;
        let contenu = document.getElementById("form_add_note_text").value;

        let note = new Note(titre,contenu);
        noteView.display(note);
    }
}

const noteView = {

    convertiseur(note){
        let conv = new showdown.Converter();
        let htmlText = conv.makeHtmk(note);
        return htmlText;
    },
    display(titre,contenu) {
            this.titre = titre;
            this.contenu = contenu;
            let variable = ""  + titre + contenu;
            variable = this.convertiseur(variable);
            let s = document.getElementsByClassName("main_note").appendChild(variable);
    }

}

const mainMenuView = {
    addHandler(event){
        noteFormView.display();
    },
    init(){
        document.getElementById("add").addEventListener("click",this.addHandler());
    },
}

window.addEventListener("load", mainMenuView.init());
