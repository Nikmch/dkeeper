import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

public type Note = {
  id: Text;
title: Text;
content: Text;
};

stable var notes: List.List<Note> = List.nil<Note>();

public func createNote(idNat: Text, titleText: Text, contentText: Text){
  let newNote: Note = {
    id = idNat;
    title = titleText;
    content = contentText;
  };

   notes := List.push(newNote, notes);
Debug.print(debug_show(notes));

};

public query func readNotes(): async [Note] {
return List.toArray(notes);

};

public func removeNote(id: Text) {
notes:= List.filter(notes, func(item : Note) : Bool{
  item.id != id});
};

};
