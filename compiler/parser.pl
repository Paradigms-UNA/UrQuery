/*
    UrQuery Parser
    EIF400 - Programming Paradigms
    Course's Project 
    
    Team 1 - 10am
    Carlos Albornoz
    Elias Arias
    Joaquin Garcia
    Jose Lopez
    Julissa Seas 
*/

:- module(parser, [prog_urquery/3]).
:- use_module(lexer).


% progUrQuery -> letprog | urQuery;
prog_urquery(urquery(UrQuery)) --> letprog(UrQuery), {!}.
prog_urquery(urquery(UrQuery)) --> tagquery(UrQuery).


% letprog --> 'let' identifier '=' expr in urQuery (tagquery)
letprog(let(X, E, in(UrQuery))) --> ws, "let", ws, id(X),
                                    {!}, ws, "=", ws, expr(E), ws,
                                    "in", ws, tagquery(UrQuery), {!}.


tagquery(uq_tagquery(tag(Tag), For)) --> ws, "<", tag(Tag), ">",
                                         ws, forquery(For),
                                         ws, "</", tag(Tag), ">", {!}.


forquery(uq_for(Qvar, in(ExprQuery), returns(VarQuery))) --> ws, "for", ws, qvar(Qvar), ws,
                                                "in", ws, exprquery(ExprQuery), ws,
                                                "return", varquery(VarQuery), {!}.


% exprquery -> sourcequery ( startxpath )?
exprquery(src_query(Src, Xpath)) --> sourcequery(Src), ws, xpath(Xpath), {!}.
exprquery(src_query(Src)) --> sourcequery(Src).

% sourcequery -> docpath | qvar;
sourcequery(SourceQuery) --> docpath(SourceQuery), {!}; qvar(SourceQuery).


% docpath --> "doc" "(" expr ")"
docpath(uq_docpath(DocPath)) --> ws, "doc", "(", ws, expr(DocPath), ws, ")", ws, {!}.


% varquery --> vartag | varpath
% encapsulates both vartag or varpath inside the atom "uq_varquery"
% Just one of both is accepted
varquery(uq_varquery(VarQuery)) --> vartag(VarQuery), {!}; varpath(VarQuery).


% vartag --> "<" tag ">" "{" varpath "}" "</" tag ">"
% returns an AST "uq_vartag", that consists of 
% an uq_tag(Tag) [The enclosing tag] and the uq_varpath enclosed.
vartag(uq_vartag(uq_tag(Tag), Varpath)) --> ws, "<", tag(Tag), ">", ws, 
                                            "{",  ws, varpath(Varpath), ws ,"}",
                                            ws, "</", tag(Tag), ">", ws, {!}.
                                            


% varpath, grammar: varpath --> qvar (xpath)?
varpath(uq_varpath(Qvar, Xpath)) --> ws, qvar(Qvar), ws, xpath(Xpath), ws, {!}.
varpath(uq_varpath(Qvar)) --> ws, qvar(Qvar), ws, {!}.


% Xpath Grammar Rule: xpath --> tag | xpath '/' tag. 
% Uses atomics_to_string to conver it to an xpath expression.
xpath(xpath_expr(X)) --> "/", tag(Xpath), rest_xpath(RestXpath), 
                        {atomics_to_string(['', Xpath | RestXpath], '/', X)}.

% /path/hola/hello/nose --> [path | hola, hello, nose] --> /path/hola/hello/nose

rest_xpath([Xpath| RestXpath ]) --> "/", tag(Xpath), {!}, rest_xpath(RestXpath).
rest_xpath([]) --> [].

% qvar is a grammar similar to an XQuery-like variable, uses identifier/3
qvar(uq_qvar(Qvar)) --> "$", identifier(Qvar).

% Possible expressions: expr -> identifier | string | '.'
expr(uq_expr(X)) --> id(X), {!}.
expr(uq_expr(active_doc)) --> ("'.'"), {!}.
expr(uq_expr(uq_string(X))) --> str(X).

% id/3 is a grammar to encapsulate the recovered ID from identifier/3, 
% and encapsulate it in an atom "uq_id"
id(uq_id(I)) --> identifier(I).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% TESTS  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

test_expr(I, O) :- 
    atom_codes(I, Codes),
    phrase(expr(O), Codes).

test_xpath(I, O):-
    atom_codes(I, Codes),
    phrase(xpath(O), Codes).

test_let(I, O):-
    atom_codes(I, Codes),
    phrase(letprog(O), Codes).

test_qvar(I, O):-
    atom_codes(I, Codes),
    phrase(qvar(O), Codes).

test_varpath(I, O):-
    atom_codes(I, Codes),
    phrase(varpath(O), Codes).

test_vartag(I, O):-
    atom_codes(I, Codes),
    phrase(vartag(O), Codes).

test_varquery(I, O):-
    atom_codes(I, Codes),
    phrase(varquery(O), Codes).

test_docpath(I, O):-
    atom_codes(I, Codes),
    phrase(docpath(O), Codes).

test_sourcequery(I, O):-
    atom_codes(I, Codes),
    phrase(sourcequery(O), Codes).

test_exprquery(I, O):-
    atom_codes(I, Codes),
    phrase(exprquery(O), Codes).


test_forquery(I, O):-
    atom_codes(I, Codes),
    phrase(forquery(O), Codes).

test_tagquery(I, O):-
    atom_codes(I, Codes),
    phrase(tagquery(O), Codes).

test_urquery(O) :- 
    File = 'test.uq',
    read_file_to_codes(File, Codes, []),
    atom_codes(Input, Codes),
    format('Input=~n~s~n', [Input]),
    phrase(prog_urquery(O), Codes).