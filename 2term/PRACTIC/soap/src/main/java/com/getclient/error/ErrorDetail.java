package com.getclient.error;

public class ErrorDetail {
    private String code;
    private String message;
    private String detail;

    public ErrorDetail(String code, String message, String detail) {
        this.code = code;
        this.message = message;
        this.detail = detail;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getDetail() {
        return detail;
    }
}
