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

:- module(lexer, [identifier/3, ws/2, str/3, tag/3]).
:- use_module(library(dcg/basics)).
:- reexport(library(dcg/basics), [number/3]).

% identifier(-I), true if dcg grammar recognizes an identifier which's name returns in I
identifier(Id) --> blanks, [C], {letter(C)}, rest_identifier(R), blanks, {atom_codes(Id, [C|R])}.

% rest_identifier() -> Returns a list of codes recursively recognizing if its an identifier
rest_identifier([C|R]) --> [C], {letter(C);num(C)}, {!}, rest_identifier(R).
rest_identifier([]) --> [].

% Helper predicates to encapsulate code_type call for letters and numbers
letter(C) :- code_type(C, alpha).
num(C) :- code_type(C, digit).
white(C) :- code_type(C, white).
alnum(C) :- code_type(C, alnum).
punct(C) :- code_type(C, punct).
printable(C) :- code_type(C, print).

is_string(C) :- alnum(C); white(C); punct(C); printable(C).

% str_quote
str_quote --> "\"".

% str(-String) --> true if dcg recognizes the string, which returns in the Variable String
str(String) --> str_quote, string(Codes), str_quote, {atom_codes(String, Codes)}.

% tag --> xml_unqualified tag, just encapsulates identifier
tag(Tag) --> identifier(Tag), {!}.


ws --> (" ";"\t";"\n";"\r"), ws.
ws -->  [].