package com.una.pp.urquerybackend.logic;

public class DataCompile {
    private String data;
    private boolean accepted;
    private String msg;
    private String target;


    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }
}