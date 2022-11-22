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

:- use_module(parser).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% FROM UQ_TREE TO JS_TREE %%%%%%%%%%%%%%%%%%%%%%%%%%% 
to_js(tagquery(tag(TagName)), JsAst):-
    atom_concat(TagName, '_tag', Id),
    JsAst = const(id(Id), lambda(arg(children), call_func(ur_tag, TagName, children))).

to_js(src_query(uq_docpath(uq_expr(Expr)), xpath_expr(Xpath)), JsAst):-
    JsAst = const(id(xpathResultIter), call_func(ur_evaluate, call_func(ur_doc, Expr), Xpath)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%%%%%%%%%%%%%%%%%%%%%%%% UTILITIES TO EMIT CODE %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
get_expr(uq_id(Expr), Expr):- !.
get_expr(uq_string(Expr), Expr):- !.
get_expr(active_doc, 'ur_active_doc()').

get_rside(call_func(Id1, call_func(Id2, ExprFunc), Xpath), Rside):-
    get_expr(ExprFunc, Expression),
    format(atom(Rside), '~s(~s(~p), ~p);', [Id1, Id2, Expression, Xpath]), !.

get_rside(call_func(Id, Arg1, Arg2), Rside):-
    format(atom(Rside), '~s(~p, ~p);', [Id, Arg1, Arg2]), !.


get_rside(lambda(arg(Arg), Expr), Rside):-
    get_rside(Expr, OtherRside),
    atom_string(OtherRside, StrRside),
    format(atom(Rside), '~p => ~s', [Arg, StrRside]).

emit_js(const(id(Id), Expr), Output):-
    get_rside(Expr, Rside),
    atom_string(Rside, StrRside),
    format(Output, 'const ~p = ~s~n', [Id, StrRside]).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

test_emit_srcQuery :-
    open('output.js', write, Stream),
    to_js(src_query(uq_docpath(uq_expr(uq_id(uri))),xpath_expr("/li")), JsAst),
    emit_js(JsAst, Stream),
    close(Stream).

test_emit_lambda :-
    open('output.js', write, Stream),
    JsAst = const(id(ul_tag), lambda(arg(children), call_func(ur_tag, "ul", children))),
    emit_js(JsAst, Stream),
    close(Stream).