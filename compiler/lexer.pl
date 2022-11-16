/*
    UrQuery Lexer
    EIF400 - Programming Paradigms
    Course's Project 
    
    Team 1 - 10am
    Carlos Albornoz
    Elias Arias
    Joaquin Garcia
    Jose Lopez
    Julissa Seas 
*/

:- use_module(library(dcg/basics)).
:- reexport(library(dcg/basics), [number/3]).
:- module(lexer, [identifier/3, ws/2, let/2, str/3]).

% identifier(-I), true if dcg grammar recognizes an identifier which's name returns in I
identifier(Id) --> blanks, [C], {letter(C)}, rest_identifier(R), blanks, {atom_codes(Id, [C|R])}.

% rest_identifier() -> Returns a list of codes recursively recognizing if its an identifier
rest_identifier([C|R]) --> [C], {letter(C);num(C)}, {!}, rest_identifier(R).
rest_identifier([]) --> [].

% Helper predicates to encapsulate code_type call for letters and numbers
letter(C) :- code_type(C, alpha).
num(C) :- code_type(C, digit).

% str(-String) --> true if dcg recognizes the string, which returns in the Variable String
str(String) --> blanks,"\"", [C], rest_identifier(R), "\"", blanks, {atom_codes(I, [C|R])}.


let --> ws,"let",ws.
let --> [].


ws --> (" ";"\t";"\n";"\r"), ws.
ws -->  [].