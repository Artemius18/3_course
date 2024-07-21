    package com.getinfo.model;

    import javax.xml.bind.annotation.*;

    @XmlRootElement(name = "GetResponse")
    @XmlAccessorType(XmlAccessType.FIELD)
    public class GetResponse {
//        @XmlElement(namespace = "http://example.com/your/servicedddd")
        private String MSG;
        public String getMSG() {
            return MSG;
        }
        public void setMSG(String MSG) {
            this.MSG = MSG;
        }
    }
