   <template>
        <div class="PaymentMain">
              <div class="Oral" >
                <div></div>
                <div>鲸小爱口语课</div>
                <div>{{Oridays}}天</div>
                <div>￥{{Oriprice }}</div>
              </div>
              <div class="Prepare" >
                <div></div>
                <div>雅思备考计划</div>
                <div>{{Prodays}}天</div>
                <div>￥{{Proprice }}</div>
              </div>
              <div class="dry" >
                <div></div>
                <div>雅思模考</div>
                <div>{{IELTSTNumber}}个</div>
                <div>￥{{IELTSTPrice /100}}</div>
              </div>
              <div class="Mask" v-if="maskFlag" >
                <div>
                  <div>想了解更多</div>
                  <div>添加鲸小爱助手查询吧</div>
                  <div>点击复制【18611575192】</div>
                  <div>微信中搜索小助手了解更多详情</div>
                  <div @click="handlerfuzhi" >点击复制微信号</div>
                  <div @click="againpay">重新支付</div>
                </div>
                <span @click="handlerx" >x</span>
              </div>
              
              <div class="selectText" >选择支付方式</div>
              <div class="weixinPay" @click="weixinpay">
                <div>
                  <p></p>
                  <p>微信支付</p>
                </div>

                <div :class="[weipayFlag ? 'weixinSelectT' : 'weixinSelect']"></div>
              </div>
              <div class="zhifuPay" @click="zhifupay" v-if="showFlag">
                <div>
                  <p></p>
                  <p>支付宝支付</p>
                </div>
                <div :class="[zhifupayFlag ? 'zhifubaoSelectT' : 'zhifubaoSelect']"></div>
              </div>
              <div class="paybottom" >
                <div>实付款：</div>
                <div>￥{{Discount}}元</div>
                <div @click="selectPay" >立即购买</div>
              </div>
              <div class="LoginPhoneTosts" v-show="this.phoneInfoFlag">
                  复制成功
              </div>
              <div class="shadow" v-if="this.orderNoFlag">
                <div>
                  <p>请确认支付是否已完成</p>
                  <p @click="Paid">已完成支付</p>
                  <p @click="Unpaid">支付遇到问题，请重新支付</p>
                </div>
              </div>
              <div id="code"   :style="{opacity:'0'}" className="copycode" >18611575192</div>
        </div>
    </template>
    <script>
        import "./index.css"
        import md5 from "js-md5";
        import { ServerIP, H5IP, isWeiXin, GetQueryString } from "../../common/common";
        export default {
          data() {
            return {
              collapsed: false,
              platform:"",
              showFlag:true,
              zhifupayFlag:false,
              weipayFlag:true,
              ProType:"",
              OriginalType:"",
              IELTSType:"",
              number:"",
              maskFlag:false,
              Prodays:0,
              Proprice:0,
              OralEnglishClass:[],
              Oridays:0,
              Oriprice:0,
              Discount:0,
              IELTSTPrice:0,
              IELTSTNumber:0,
              phoneInfoFlag:false,
              orderNoFlag:false,
            }
          },
          created(){
            // fetch("http://jztest.jinghangapps.com:5432/v2/singlesDay/showGoodsPageInfo")
            // .then((res)=>{
            //   return res.json()
            // })
            // .then((res)=>{
            //   console.log(res);
            //   this.OralEnglishClass=res.data.goodsArr;
            //   console.log(this.OralEnglishClass);
            // })
            if (!isWeiXin()) {
              if (localStorage.getItem("orderNo")) {
                this.orderNoFlag = true;
              }
            } else {
              this.showFlag = false;
            }
          },
          mounted(){
            this.IELTSTPrice = localStorage.getItem("number") * localStorage.getItem("UnitPrice")
            this.IELTSTNumber = localStorage.getItem("number")
            this.Discount = GetQueryString("Discount")
            if(localStorage.getItem("ProType")==""){
                
            }else{
              this.ProType = localStorage.getItem("ProType");
              if(localStorage.getItem("ProType")== 4 ){
                this.Prodays=7
                this.Proprice = localStorage.getItem("Proprice")
              }else if(localStorage.getItem("ProType")== 5 ){
                this.Prodays = 14
                this.Proprice = localStorage.getItem("Proprice")
              }else if(localStorage.getItem("ProType")== 6){
                this.Prodays = 30;
                this.Proprice = localStorage.getItem("Proprice")
              }else if(localStorage.getItem("ProType")== 7){
                this.Prodays = 60;
                this.Proprice = localStorage.getItem("Proprice")
              }else if(localStorage.getItem("ProType")== 8){
                this.Prodays = 90;
                this.Proprice = localStorage.getItem("Proprice")
              }
            };
            if(localStorage.getItem("OriginalType")==""){

            }else{
              
              this.OriginalType = localStorage.getItem("OriginalType");
              if(localStorage.getItem("OriginalType")== 1 ){
                this.Oridays=30
                this.Oriprice = localStorage.getItem("Oriprice")
              }else if(localStorage.getItem("OriginalType")== 2 ){
                this.Oridays = 180
                this.Oriprice = localStorage.getItem("Oriprice")
              }else if(localStorage.getItem("OriginalType")== 3){
                this.Oridays = 360;
                this.Oriprice = localStorage.getItem("Oriprice")
              }
            };
            if(localStorage.getItem("IELTSType")==""){

            }else{
              this.IELTSType = localStorage.getItem("IELTSType");
            };
            if(localStorage.getItem("number")==""){

            }else{
              this.number = localStorage.getItem("number");
            }
            
          },
          methods:{
            handlerfuzhi(){
              this.copy("code")
              this.phoneInfoFlag=true;
              setTimeout(()=>{
                this.phoneInfoFlag=false;
              },2000)
            },
            againpay(){
                this.maskFlag=false
                this.selectPay()
            },
            handlerx(){
                this.maskFlag=false
            },
            selectPay(){
              
              if(this.weipayFlag){
                
                  if(isWeiXin()){
                    this.showFlag=false
                    this.jsapipay()
                  }else{
                    this.tenpay()
                  }
              }else if(this.zhifupayFlag){
              
                  this.ailipay()
              }
            },
            jsapipay(){ //微信公众号支付
                this.code = GetQueryString("code");
                let data = new FormData();
                data.append("payType", GetQueryString("paytype"));
                data.append("type", 0);
                data.append("code",this.code)
                var ProType = this.ProType;
                var OriginalType = this.OriginalType;
                var IELTSType = this.IELTSType;
                var number = this.number;
                let obj = {}
                if(ProType){
                  obj[ProType]=1;
                }
                if(OriginalType){
                  obj[OriginalType]=1;
                }
                if(IELTSType){
                  obj[IELTSType]=number;
                }
                var goodsGroupInfo = JSON.stringify(obj)
                data.append("goodsGroupInfo",goodsGroupInfo);
                fetch(ServerIP + "v2/wxH5Helper/jsAPIPay", {
                  method: "post",
                  body: data,
                  mode: "cors",
                  headers: {
                    "authorization":"Bearer "+localStorage.getItem("token"),
                  }
                }).then((res)=>{
                    return res.json()
                }).then((res)=>{  
                    console.log(res)
                    if(res.code == 200){
                      localStorage.setItem("orderNo", res.data.orderNo);
                      this.callWxPay(res.data);
                    }
                })
            },
            weixinpay(){
                this.weipayFlag = true;
                this.zhifupayFlag = false;
            },
            zhifupay(){
                this.zhifupayFlag = true;
                this.weipayFlag = false;
            },

            ailipay(){ //支付宝支付
              let data = new FormData();
              var ProType = this.ProType;
              var OriginalType = this.OriginalType;
              var IELTSType = this.IELTSType;
              var number = this.number;
              let obj = {}
              if(ProType){
                obj[ProType]=1;
              }
              if(OriginalType){
                obj[OriginalType]=1;
              }
              if(IELTSType){
                obj[IELTSType]=number;
              }
              data.append('payType',GetQueryString("paytype"));
              data.append('type',0);
              var goodsGroupInfo = JSON.stringify(obj)
              data.append("goodsGroupInfo",goodsGroupInfo);
              let redirecturi = "https://" + window.location.host+"/payment"+window.location.search;
              data.append("returnUrl",redirecturi)
              fetch(ServerIP+"v2/aliH5Helper/h5Pay",{
                method:"post",
                body:data,
                mode:"cors",
                headers:{
                    "authorization":"Bearer "+localStorage.getItem("token"),
                 }            
              }).then((res)=>{
                return res.json()
              }).then((res)=>{
                localStorage.setItem("orderNo", res.data.orderNo);
                location.href=res.data.url;
              })
            },
            tenpay(){ //h5支付
              let data = new FormData();
              var obj = {}
              var ProType = this.ProType;
              var OriginalType = this.OriginalType;
              var IELTSType = this.IELTSType;
              var number = this.number;
              if(ProType){
                obj[ProType]=1;
              }
              if(OriginalType){
                obj[OriginalType]=1;
              }
              if(IELTSType){
                obj[IELTSType]=number;
              }
              
              data.append('payType',GetQueryString("paytype"));
              data.append('type',0);
              var goodsGroupInfo = JSON.stringify(obj)
              data.append("goodsGroupInfo",goodsGroupInfo);
              fetch(ServerIP+"v2/wxH5Helper/h5Pay",{
                method:"post",
                body:data,
                mode:"cors",
                headers:{
                    "authorization":"Bearer "+localStorage.getItem("token"),
                 }            
              }).then((res)=>{
                return res.json()
              }).then((res)=>{
                  console.log(res)
                  localStorage.setItem("orderNo", res.data.orderNo);
                  var url = "https://" + window.location.host+"/payment"+window.location.search;
                  url = encodeURIComponent(url);
                  location.href=res.data.mweb_url + "&redirect_url=" + url;
              })
            },
            isWeiXin() {
                //判断是否微信平台
                let ua = window.navigator.userAgent.toLowerCase();
                return ua.match(/MicroMessenger/i) == "micromessenger";
            },
            jsApiCall(params) {
                  
                  var _this = this;
                  let m = "MD5";
                  let stringA = `appId=${params.appId}&nonceStr=${params.nonceStr}&package=prepay_id=${params.prepayid}&signType=${m}&timeStamp=${params.timeStamp}`;
                  let stringSignTemp = stringA + "&key=jinghangjinghangjinghang20182019";
                  let sign = md5(stringSignTemp).toUpperCase();
                  WeixinJSBridge.invoke(
                    "getBrandWCPayRequest",
                    {
                      appId: params.appId,
                      timeStamp: params.timeStamp,
                      nonceStr: params.nonceStr,
                      package: params.package,
                      signType: "MD5",
                      paySign: params.paySign
                    },
                    function(res) {
                    
                      if (res.err_msg === "get_brand_wcpay_request:ok") {
                        window.location.href=H5IP+"act"
                      } else if (res.err_msg === "get_brand_wcpay_request:cancel") {
                        localStorage.removeItem("orderNo");
                        _this.maskFlag=true
                      } else if (res.err_msg === "get_brand_wcpay_request:fail") {
                        localStorage.removeItem("orderNo");
                      }
                    }
                  );
                },
            // 公众号支付监听 否则无法调动支付控件;
            callWxPay(params) {

              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener(
                    "WeixinJSBridgeReady",
                    this.jsApiCall(params),
                    false
                  );
                } else if (document.attachEvent) {
                  document.attachEvent("WeixinJSBridgeReady", this.jsApiCall(params));
                  document.attachEvent("onWeixinJSBridgeReady", this.jsApiCall(params));
                }
              } else {
             
                this.jsApiCall(params);
              }
            },
            Paid(){
             this.orderNoFlag = false;
             this.Whether();         
            },
            copy (id, attr) 
              {
                let target = null;
                
                if (attr) {
                  target = document.createElement("div");
                  target.id = "tempTarget";
                  target.style.opacity = "0";
                  if (id) {
                  let curNode = document.querySelector("#" + id);
                  target.innerText = curNode[attr];
                  } else {
                  target.innerText = attr;
                  }
                  document.body.appendChild(target);
                } else {
                  target = document.querySelector("#" + id);
                }
                
                try {
                let range = document.createRange();
                range.selectNode(target);
                console.log(range)
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand("copy");
                window.getSelection().removeAllRanges();
                console.log("复制成功")
                } catch (e) {
                console.log("复制失败")
                }
                
                if (attr) {
                // remove temp target
                target.parentElement.removeChild(target);
                }
                },
            Unpaid(){
             this.orderNoFlag = false;
             this.Whether(); 
            },
                //判断是否支付成功
                Whether() {
                  let data = new FormData();
                  data.append("orderNo", localStorage.getItem("orderNo"));
                  fetch(ServerIP + "v2/singlesDay/queryPayResult", {
                    method: "post",
                    body: data,
                    mode: "cors",
                    headers: {
                      authorization: "Bearer " + localStorage.getItem("token")
                    }
                  })
                    .then(res => {
                      return res.json();
                    })
                    .then(res => {
                        if(res.data.trade_state == "SUCCESS"){
                          localStorage.removeItem("orderNo")
                          window.location.href = H5IP+"act"
                          
                        }else if(res.data.trade_state == "NOTPAY"){
                           localStorage.removeItem("orderNo")
                           this.orderNoFlag=false
                           window.location.href = H5IP+"payment"+window.location.search
                        }
                    });
                }
          },

        }
          
          
        
    </script>
